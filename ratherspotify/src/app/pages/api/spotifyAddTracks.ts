import { Track } from "@/app/components/Track";
import getAccessToken from "./spotifyApi"
/**
 * Adds tracks to the given spotify playlist.
 * @param playlistId The spotify ID for the playlist we want to modify.
 * @param tracks The list of spotify track URI's .
 * @param recommendations Boolean indicator if the user wants to add recommended tracks.
 * @param recursionDepth Number of recursive calls to add recommended tracks.
 */
async function addTracks({playlistId, tracks,recommendations, recursionDepth = 0} :{playlistId:string, tracks:Track[], recommendations:boolean, recursionDepth?: number}){
    const accessToken = await getAccessToken();
    const trackUris = tracks.map(track => track.uri);
    const reqBody = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            uris: trackUris
        })
    };

    try{
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, reqBody);
        console.log(response)
        await response.json();
        
        if (recommendations && recursionDepth < 1) {  // Limiting the recursion depth to 1
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
    const accessToken = await getAccessToken();
    const seedTracks = tracks.slice(0, 5);  // Spotify API allows up to 5 seed tracks
    const reqBody = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    };
    const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${seedTracks.join(',')}&min_popularity=64`,reqBody);

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
        imageURL: track.album.images[0].url, // Assuming there is at least one image
        date: track.album.release_date, // Assuming release_date is available
        artists: track.artists.map((artist: any) => artist.name) // Assuming artists are available
    }));

    return recommendedTracks;
}


export default addTracks;