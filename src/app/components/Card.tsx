import { useState, useEffect } from 'react'
import {Track} from './Track'

/**
 * Card component where the album info will be displayed.
 * @param album The album title
 * @param imageURL The spotify album/track image url
 * @param artist The name of the artist
 * @param position If the position of the card will be on the left or right side.
 * @param onClick The event handler.
 */

 function Card({album, imageURL, artist, position, onClick}: cardProps){
    const cardColor =  position === 'left' ? 'bg-blue-600':'bg-rose-600'

    return(
        <div className={`flex flex-col justify-center items-center w-1/2 h-auto shadow-lg rounded-xl hover:scale-110 transition-transform duration-300 ${cardColor}`} style={{ aspectRatio: '1/1' }} onClick={onClick}>
            <div className="relative w-3/4 h-3/4">
            <img src = {imageURL} alt='playlist image' className='absolute inset-0 w-3/4 h-auto m-auto object-cover rounded-t-xl'/>
            </div>
            <div className="text-center">
                <p className=" Damfont-mono  font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">{album}</p>
                <p className="Damfont-mono  font-bold text-base md:text-lg lg:text-xl xl:text-2xl mt-2">{artist}</p>
            </div>
        </div>
    )
 
}

/**
 * The component that displays the cards in place. It also handles the data the cards will display.
 * @param props [albums] Track[], the array of Track that the cards will display.
 * @returns 
 */
export default function CardDisplay({albums,saveSong, onFinish}:{albums:Track[], saveSong:(track: Track) => void, onFinish: ()=> void }){

    const [leftCardIndex, setLeftCardIndex] = useState(0);
    const [rightCardIndex, setRightCardIndex] = useState(1);
      
    const fetchNewTracks = () => {
        
        const newLeftIndex = leftCardIndex + 2;
        const newRightIndex = rightCardIndex + 2;

        if(newLeftIndex >= albums.length || newRightIndex >= albums.length){
            onFinish();
            return;
        }
        setLeftCardIndex(newLeftIndex);
        setRightCardIndex(newRightIndex);
    }
    
    // Event handler when selecting one card.
    const handleAlbumSelection = (track: Track) =>{
        saveSong(track);
        fetchNewTracks();
    }
    

    return(
        <div className="flex mt-12 w-full justify-center space-x-32">
            <Card album={albums[leftCardIndex].name} imageURL={albums[leftCardIndex].imageURL} artist= {albums[leftCardIndex].artists[0]}position='left' onClick={()=>handleAlbumSelection(albums[rightCardIndex])}/>
            <Card album={albums[rightCardIndex].name} imageURL={albums[rightCardIndex].imageURL} artist= {albums[rightCardIndex].artists[0]}position='right' onClick={()=>handleAlbumSelection(albums[rightCardIndex])}/>
        </div>
        
    )
}

/**
 * Interface for the card props. Contains the displayable data.
 */
interface cardProps {
    //The name of the album.
    album : string;
    //The URL for the image.
    imageURL : string;
    //The date the album was published.
    artist: string;
    //The position of the card
    position : 'left' | 'right';
    //The click function
    onClick : ()=>void;
}
