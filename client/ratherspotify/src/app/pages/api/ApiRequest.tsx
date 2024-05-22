import getAccessToken from './spotifyApi';
import {Track} from '../../Track'

async function getAlbums(genre: string) {
    const accessToken = await getAccessToken();
    const searchParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    };
    const encodedGenre = encodeURIComponent(`${genre}`);
    const response = await fetch(`https://api.spotify.com/v1/search?q=genre:${encodedGenre}&type=track&limit=44&market=US&offset=${getRandomSearch()}`, searchParams);
    const data = await response.json();
    console.log(data)
    return cleanAlbumData(data.tracks.items);
}

const cleanAlbumData = (albums:any[]): Track[] =>{

    return albums.map(album => ({
        id: album.id,
        name: album.name,
        imageURL: album.album.images[0].url,
        date: album.album.release_date,
        artists: album.artists.map((artist: any) => artist.name)
    }))
}


function getRandomSearch() {
  const randomNumber = Math.floor(Math.random() * (500) + 1);
  console.log(randomNumber)
  return randomNumber;
}


export default getAlbums;