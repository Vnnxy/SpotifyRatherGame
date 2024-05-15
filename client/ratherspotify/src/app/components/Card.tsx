/**
 * Card component where the album info will be displayed.
 * @param param0 
 * @returns 
 */

export default function Card({playlistName, imageURL, artist, position}: cardProps){
    const cardColor =  position === 'left' ? 'bg-blue-600':'bg-rose-600'
    return(
        <div className={`flex flex-col justify-center items-center w-1/2 h-auto shadow-lg rounded-xl ${cardColor}`} style={{ aspectRatio: '1/1' }}>
            <div className="relative w-3/4 h-3/4">
            <img src = {imageURL} alt='playlist image' className='absolute inset-0 w-3/4 h-auto m-auto object-cover rounded-t-xl'/>
            </div>
            <div className="text-center">
                <p className="font-mono text-5xl">{playlistName}</p>
                <p className="fonr-mono text-2xl">{artist}</p>
            </div>
            
        </div>
    )
 
}

/**
 * Interface for the card props. Contains the displayable data.
 */
interface cardProps {
    //The name of the playlist.
    playlistName : string;
    //The URL for the image.
    imageURL : string;
    //The date the album was published.
    artist: string;
    //The position of the card
    position : 'left' | 'right';
}