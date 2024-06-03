'use client'

import CardDisplay from "./Card"
import Menu from "./Menu"
import { useState } from "react"
import {Track} from './Track'
import PlaylistConfig from "./PlaylistConfig"

//Component that renders the cards or the menu.
export default function DisplayManager(){

  // The state containing the album elements.
  const [albums, setAlbums] = useState<Track[]>([]);
  // React state for the plaulist songs
  const [playlistSongs, setPlaylistSongs] = useState<Track[]>([]);


  // Updates the PlaylistSongs state to add the selected ones.
  const saveSong = (track:Track) =>{
    setPlaylistSongs([
        ...playlistSongs, track])
    console.log(playlistSongs)
  };



  //Event handler for the selection of the genre.
  const handleGenreSelection = async (genre: string) => {
  try {
    const response = await fetch(`/api/getAlbums?genre=${encodeURIComponent(genre)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch albums');
    }
    const fetchedAlbums: Track[] = await response.json();
    setAlbums(fetchedAlbums);
  } catch (error) {
    console.error('Error fetching albums:', error);
  } 
  };


    
return (
    <div className="w-full">
        <PlaylistConfig/>
        {albums.length > 0 ? (
            <CardDisplay albums={albums} saveSong={saveSong} />
        ) : (
            <Menu genres={[' pop', ' Kpop', 'Rap', 'Rock', 'Reggaeton', ' R&B']} onGenreSelection={handleGenreSelection} />
        )}
    </div>
);


}