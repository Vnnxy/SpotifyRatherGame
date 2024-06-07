'use server'
import { Track } from "@/app/components/Track";
import fetchWithToken from "./spotifyApi"
/**
 * Adds tracks to the given spotify playlist.
 * @param playlistId The spotify ID for the playlist we want to modify.
 * @param tracks The list of spotify track URI's .
 * @param recommendations Boolean indicator if the user wants to add recommended tracks.
 * @param recursionDepth Number of recursive calls to add recommended tracks.
 */
async function addTracks({playlistId, tracks,recommendations, recursionDepth = 0} :{playlistId:string, tracks:Track[], recommendations:boolean, recursionDepth?: number}){
    const trackUris = tracks.map(track => track.uri);
    const reqBody = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uris: trackUris
        })
    };

    try{
        const response = await fetchWithToken(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, reqBody);
        if (!response.ok) {
            console.error("Failed to add tracks to playlist", await response.text());
            return;
          }
        await response.json();
        console.log('Tracks added successfully');
        
        if (recommendations && recursionDepth < 2) {  // Limiting the recursion depth to 1
            const trackIds = tracks.map(track => track.id)
            const recommendedTracks = await getRecommendedTracks(trackIds);
            if (recommendedTracks.length > 0) {
                await addTracks({ playlistId, tracks: recommendedTracks, recommendations:false, recursionDepth: recursionDepth + 1 });
            }
        }
        }catch(error){
            console.error('Error while trying to add tracks to playlist', error);
            throw error;
        }
}


/**
 * Fetches recommended tracks based on the given tracks.
 * @param tracks The list of spotify track URI's.
 * @returns {Promise<string[]>} A promise that resolves to a list of recommended track URI's.
 */
async function getRecommendedTracks(tracks: string[]): Promise<Track[]> {
    const seedTracks = tracks.slice(0, 5);  // Spotify API allows up to 5 seed tracks
    const reqBody = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetchWithToken(`https://api.spotify.com/v1/recommendations?seed_tracks=${seedTracks.join(',')}&min_popularity=64`,reqBody);

    if (!response.ok) {
        const errorText = await response.text();
            console.error('Spotify API error:', errorText);
        throw new Error('Failed to fetch recommended tracks');
    }

    const data = await response.json();
    const recommendedTracks: Track[] = data.tracks.map((track: any) => ({
        id: track.id,
        uri: track.uri,
        name: track.name,
        imageURL: track.album.images[0].url, 
        date: track.album.release_date,
        artists: track.artists.map((artist: any) => artist.name)
    }));

    return recommendedTracks;
}


export default addTracks;