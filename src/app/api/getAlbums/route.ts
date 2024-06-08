import { NextRequest, NextResponse } from 'next/server';
import { Track } from '@/app/components/Track';
import fetchWithToken from '@/app/pages/api/spotifyApi';

/**
 * The route api route defined to search for genres.
 * @param req The parameters it requires to make the search
 * 
 */
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const genre = searchParams.get('genre');

    if (!genre || typeof genre !== 'string') {
        return NextResponse.json({ error: 'Genre is required and must be a string' }, { status: 400 });
    }

    try {
        const searchParams = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const encodedGenre = encodeURIComponent(genre);
        const response = await fetchWithToken(`https://api.spotify.com/v1/search?q=genre:${encodedGenre}&type=track&limit=44&market=US&offset=${getRandomSearch()}`, searchParams);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Spotify API error:', errorText);
            throw new Error('Failed to fetch data from Spotify');
        }

        const data = await response.json();
        const cleanedData = cleanAlbumData(data.tracks.items);
        return NextResponse.json(cleanedData);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

/**
 * Cleans and formats the data received.
 * @param albums The json data fetched from spotify api.
 * @returns An array of Tracks.
 */
const cleanAlbumData = (albums: any[]): Track[] => {
    return albums.map(album => ({
        id: album.id,
        uri: album.uri,
        name: album.name,
        imageURL: album.album.images[0].url,
        date: album.album.release_date,
        artists: album.artists.map((artist: any) => artist.name)
    }));
}
/**
 * Generates a random number between 1-500 to use as the page we will be getting the tracks from.
 * @returns Random number between 1 and 500
 */
function getRandomSearch() {
    const randomNumber = Math.floor(Math.random() * (500) + 1);
    return randomNumber;
}
