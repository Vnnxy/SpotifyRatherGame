import getAccessToken from "./spotifyApi"
/**
 * Adds tracks to the given spotify playlist.
 * @param playlistId The spotify ID for the playlist we want to modify.
 * @param tracks The list of spotify track URI's .
 * @param recommendations Boolean indicator if the user wants to add recommended tracks.
 * @param recursionDepth Number of recursive calls to add recommended tracks.
 */
async function addTracks({playlistId, tracks,recommendations, recursionDepth = 0} :{playlistId:string, tracks:string [], recommendations:boolean, recursionDepth?: number}){
    const accessToken = getAccessToken();
    const reqBody = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            uris: tracks,
            position: 0
        })
    };

    try{
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, reqBody);
        await response.json();
        if (recommendations && recursionDepth < 2) {  // Limiting the recursion depth to 3
            const recommendedTracks = await getRecommendedTracks(tracks);
            if (recommendedTracks.length > 0) {
                await addTracks({ playlistId, tracks: recommendedTracks, recommendations, recursionDepth: recursionDepth + 1 });
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
async function getRecommendedTracks(tracks: string[]): Promise<string[]> {
    const accessToken = getAccessToken();
    const seedTracks = tracks.slice(0, 5);  // Spotify API allows up to 5 seed tracks
    const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${seedTracks.join(',')}&min_popularity=64`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch recommended tracks');
    }

    const data = await response.json();
    return data.tracks.map((track: any) => track.uri);
}