import { useState } from "react"
import createPlaylist from "../pages/api/spotifyPlaylistCreator";
import SmallCardSelector from "./SmallCardSelector";
import addTracks from "../pages/api/spotifyAddTracks";
import { Track } from "./Track";
import { useRouter } from "next/navigation";

function PlaylistConfig( {selectedTracks}: {selectedTracks : Track[]}){

    //The state that shows if the user wants to create a playlist or not.
    const [playlistChoice, setPlaylistChoice] = useState<true | false | null>(null);
    //State that shows if the user wants similar tracks.
    const [addRecommendedTracks, setRecommendedTracks] = useState<boolean>(false);
    //The name of the playlist the user wants.
    const [playlistName, setPlaylistName] = useState('');

    const router = useRouter();

    const handleRecommendation = (userChoice: true | false) => {
        setRecommendedTracks(userChoice);
    };
    

    const handlePlaylistChoice = (userChoice: true | false) => {
        setPlaylistChoice(userChoice);
        if (userChoice === false) {
            router.push('/')
        }
    };

    const handleCreatePlaylist = async () => {
        try {
            const playlistId = await createPlaylist({ PlaylistName: playlistName});
            await addTracks({playlistId, tracks: selectedTracks, recommendations: addRecommendedTracks});
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
                        <SmallCardSelector onClick={handlePlaylistChoice} />
                    </div>
                </>
                )}
                {playlistChoice === true && (
                    <>
                        <div className="text-black text-center font-mono text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4">
                            Your Playlist Settings:
                        </div>
                        <div className="text-black mt-4 mb-4 text-center">
                            The name of your playlist:
                            <input className="border border-gray-300 p-2 rounded" value={playlistName} onInput={e=> setPlaylistName((e.target as HTMLTextAreaElement).value)}/>
                        </div>
                        <div className="text-black mt-4 mb-4 text-center">
                            Do you want to add similar songs to the playlist?
                            <SmallCardSelector onClick={handleRecommendation} />
                        <button type="button" onClick={handleCreatePlaylist}>Create Playlist</button>

                        </div>
                        
                    </>
                )}
            </div>
    
    );
}

export default PlaylistConfig;