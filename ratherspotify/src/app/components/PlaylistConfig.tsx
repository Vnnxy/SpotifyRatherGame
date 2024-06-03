import { useState } from "react"
import createPlaylist from "../pages/api/spotifyPlaylistCreator";
import SmallCardSelector from "./SmallCardSelector";

function PlaylistConfig(){

    //The state that shows if the user wants to create a playlist or not.
    const [playlistChoice, setPlaylistChoice] = useState<'yes' | 'no' | null>(null);
    //State that shows if the user wants similar tracks.
    const [addRecommendedTracks, setRecommendedTracks] = useState(false);
    //The name of the playlist the user wants.
    const [playlistName, setPlaylistName] = useState('TestPlaylist');

    


    const handlePlaylistChoice = (userChoice: 'yes' | 'no') => {
        setPlaylistChoice(userChoice);
        if (userChoice === 'no') {
            //Return to main menu
        }
    };

    const handleCreatePlaylist = async () => {
        try {
            const playlistData = await createPlaylist({ PlaylistName: playlistName});
        } catch (error) {
            console.error('Error creating playlist:', error);
        }
    };

    return (
        
            <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                
                {playlistChoice === null && (
                <>
                    <div className="text-black text-center font-mono text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4">
                    You have reached the end of the game!
                </div>
                    <div className="text-black mt-4 mb-4 text-center">
                        Do you wish to create a playlist with the songs you have chosen?
                        <SmallCardSelector onSelect={handlePlaylistChoice} />
                    </div>
                </>
                )}
                {playlistChoice === 'yes' && (
                    <>
                        <div className="text-black text-center font-mono text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4">
                            Your Playlist Settings:
                        </div>
                        <div className="text-black mt-4 mb-4 text-center">
                            The name of your playlist: <input className="border border-gray-300 p-2 rounded" />
                        </div>
                        <div className="text-black mt-4 mb-4 text-center">
                            Do you want to add similar songs to the playlist?
                            <SmallCardSelector onSelect={() => {}} />
                        <button type="button" onClick={handleCreatePlaylist}>Create Playlist</button>

                        </div>
                        
                    </>
                )}
            </div>
    
    );
}

export default PlaylistConfig;