'use client'

import CardDisplay from "./Card"
import Menu from "./Menu"
import { useState, useEffect } from "react"
import getAlbums from '../pages/api/ApiRequest'
import {Track} from '../Track'

//Component that renders the cards or the menu.
export default function DisplayManager(){

    // The state containing the album elements.
    const [albums, setAlbums] = useState<Track[]>([]);

    //Event handler for the selectionn of the genre.
    const handleGenreSelection = async (genre:string) =>{
        const fetchedAlbums = await getAlbums(genre);
        setAlbums(fetchedAlbums);
    }

    
  return (
    <div className="w-full">
        {albums.length > 0 ? (
            <CardDisplay albums={albums} />
        ) : (
            <Menu genres={[' pop', ' Kpop', 'Rap', 'Rock', 'Reggaeton', ' R&B']} onGenreSelection={handleGenreSelection} />
        )}
    </div>
);


}