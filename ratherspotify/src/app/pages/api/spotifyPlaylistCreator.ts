'use server'

import getAccessToken from "./spotifyApi"

/**
 * Creates a playlist using the spotify API.
 * @param PlaylistName The name of the playlist
 * @returns responseData.
 */
export default async function createPlaylist ({PlaylistName}:{PlaylistName:string}){
    const accessToken = await getAccessToken();
    const userId = await getUserId();
    const reqBody = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            name: PlaylistName,
            description: 'A playlist from Spotify Rather Be',
            public: false
        })
    };

    try{
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, reqBody);
    const responseData = await response.json();
    return responseData.id;

    }catch(error){
        console.error('Error with playlist creation', error);
        throw error;
    }

}

/**
 * Gets the current user ID by callilng the spotify API.
 * @returns The user's id.
 */
const getUserId = async () : Promise<string> => {
    try{
    const accessToken = await getAccessToken();
    const reqBody = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    };

    const response = (await fetch('https://api.spotify.com/v1/me', reqBody));
    if (!response.ok) {
        throw new Error(`Spotify API error: ${response.statusText}`);
    }

    const userData = await response.json();
    const userId = userData.id;
    if (!userId) {
        throw new Error('User ID not found in response');
    }

    return userId;

} catch (error) {
    console.error('Error fetching user ID:', (error as Error).message);
    throw error; 
}
   
}