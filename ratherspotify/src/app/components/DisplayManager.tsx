'use client'

import CardDisplay from "./Card"
import Menu from "./Menu"
import { useState } from "react"
import {Track} from './Track'
import { useTracks } from "@/context/TracksContent"
import { useRouter } from "next/navigation"

//Component that renders the cards or the menu.
export default function DisplayManager(){

  // The state containing the album elements.
  const [albums, setAlbums] = useState<Track[]>([]);
  // React state for the playlist songs
  const { playlistSongs, setPlaylistSongs } = useTracks();

  const router = useRouter();


  // Updates the PlaylistSongs state to add the selected ones.
  const saveSong = (track:Track) =>{
    setPlaylistSongs([
        ...playlistSongs, track])
  };

  const handleCardDisplayCompletion = () => {
    router.push(`/playlistConfiguration`);
  };



  //Event handler for the selection of the genre.
  const handleGenreSelection = async (genre: string) => {
  try {
    const response = await fetch(`/api/getAlbums?genre=${encodeURIComponent(genre)}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Spotify API error:', errorText);
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
        {albums.length > 0 ? (
            <CardDisplay albums={albums} saveSong={saveSong} onFinish={handleCardDisplayCompletion} />
        ) : (
            <Menu genres={[' pop', ' Kpop', 'Rap', 'Rock', 'Reggaeton', ' R&B']} onGenreSelection={handleGenreSelection} />
        )}
    </div>
);


}