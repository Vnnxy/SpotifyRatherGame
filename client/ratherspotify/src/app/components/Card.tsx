import { useState } from 'react'
import {Track} from '../Track'

/**
 * Card component where the album info will be displayed.
 * @param param0 
 * @returns 
 */

 function Card({album, imageURL, artist, position, onClick}: cardProps){
    const cardColor =  position === 'left' ? 'bg-blue-600':'bg-rose-600'

    return(
        <div className={`flex flex-col justify-center items-center w-1/2 h-auto shadow-lg rounded-xl hover:scale-110 transition-transform duration-300 ${cardColor}`} style={{ aspectRatio: '1/1' }} onClick={onClick}>
            <div className="relative w-3/4 h-3/4">
            <img src = {imageURL} alt='playlist image' className='absolute inset-0 w-3/4 h-auto m-auto object-cover rounded-t-xl'/>
            </div>
            <div className="text-center">
                <p className="font-mono text-xl md:text-2xl lg:text-3xl xl:text-4xl">{album}</p>
                <p className="font-mono text-base md:text-lg lg:text-xl xl:text-2xl mt-2">{artist}</p>
            </div>
        </div>
    )
 
}

export default function CardDisplay(props:{albums:Track[]}){

    const [leftCardIndex, setLeftCardIndex] = useState(0);
    const [rightCardIndex, setRightCardIndex] = useState(1);

 
    const fetchNewAlbum = () => {
        setLeftCardIndex((prevLeftIndex) => {
            const newLeftIndex = (prevLeftIndex + 1) % props.albums.length;
            return newLeftIndex === rightCardIndex ? (newLeftIndex + 1) % props.albums.length : newLeftIndex;
        });
    
        setRightCardIndex((prevRightIndex) => {
            const newRightIndex = (prevRightIndex + 2) % props.albums.length;
            return newRightIndex === leftCardIndex ? (newRightIndex + 1) % props.albums.length : newRightIndex;
        });

        
    }

    return(
        <div className="flex mt-12 w-full justify-center space-x-32">
            <Card album={props.albums[leftCardIndex].name} imageURL={props.albums[leftCardIndex].imageURL} artist= {props.albums[leftCardIndex].artists[0]}position='left' onClick={fetchNewAlbum}/>
            <Card album={props.albums[rightCardIndex].name} imageURL={props.albums[rightCardIndex].imageURL} artist= {props.albums[rightCardIndex].artists[0]}position='right' onClick={fetchNewAlbum}/>
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

