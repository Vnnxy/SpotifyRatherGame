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

    const response = await fetch(`https://api.spotify.com/v1/search?q=${genre}${getRandomSearch()}&type=track`, searchParams);
    const data = await response.json();
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


// This is from: https://perryjanssen.medium.com/getting-random-tracks-using-the-spotify-api-61889b0c0c27

function getRandomSearch() {
    // A list of all characters that can be chosen.
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    
    // Gets a random character from the characters string.
    const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
    let randomSearch = '';
  
    // Places the wildcard character at the beginning, or both beginning and end, randomly.
    switch (Math.round(Math.random())) {
      case 0:
        randomSearch = randomCharacter + '%25';
        break;
      case 1:
        randomSearch = '%25' + randomCharacter + '%25';
        break;
    }
    console.log(randomSearch)
    return randomSearch;
  }


export default getAlbums;