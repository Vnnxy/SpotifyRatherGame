'use client'
import { useState } from "react"
import createPlaylist from "../pages/api/spotifyPlaylistCreator";
import SmallCardSelector from "./SmallCardSelector";
import addTracks from "../pages/api/spotifyAddTracks";
import { Track } from "./Track";
import { useRouter } from "next/navigation";
import { useTracks } from "@/context/TracksContent"


function PlaylistConfig( {selectedTracks}: {selectedTracks : Track[]}){
    //The state that shows if the user wants to create a playlist or not.
    const [playlistChoice, setPlaylistChoice] = useState<true | false | null>(null);
    //State that shows if the user wants similar tracks.
    const [addRecommendedTracks, setRecommendedTracks] = useState<boolean>(false);
    //The name of the playlist the user wants.
    const [playlistName, setPlaylistName] = useState('');

    const { playlistSongs, setPlaylistSongs } = useTracks();

    const router = useRouter();

    const handleRecommendation = (userChoice: true | false) => {
        setRecommendedTracks(userChoice);
    };
    

    const handlePlaylistChoice = (userChoice: true | false) => {
        setPlaylistChoice(userChoice);
        if (userChoice === false) {
            router.push('/')
            setPlaylistSongs([]);
        }
    };


    const handleCreatePlaylist = async () => {
        try { 
            const playlistId = await createPlaylist({ PlaylistName: playlistName});
            await addTracks({playlistId, tracks: (selectedTracks), recommendations: addRecommendedTracks});
            router.push('/');
            setPlaylistSongs([]);
        } catch (error) {
            console.error('Error creating playlist:', error);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center w-full">
            <div className="w-full max-w-2xl mx-auto flex flex-col justify-center content-center items-center text-black px-12 py-14  dark:text-neutral-200 border border-black dark:border-[#616467] bg-transparent rounded-xl shadow-md">
                
                {playlistChoice === null && (
                <>
                    <div className="text-center tracking-widest Damfont-mono text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4 mt-4 uppercase font-bold">
                    You have reached the end of the game!
                </div>
                    <div className=" mt-4 mb-4 tracking-widest Damfont-mono text-center uppercase font-bold">
                        Do you wish to create a playlist with the songs you have chosen?
                        <SmallCardSelector onClick={handlePlaylistChoice} />
                    </div>
                </>
                )}
                {playlistChoice === true && (
                    <>
                        <div className=" text-center tracking-widest Damfont-mono uppercase font-bold text-xl md:text-2xl mt-4 lg:text-3xl xl:text-4xl">
                            Playlist Settings:
                        </div>
                        <div className=" mt-4 mb-4 text-center w-full max-w-xs">
                        <div className="relative mt-6">
                            <label className="absolute left-0 ml-1 -translate-y-3  tracking-widest translate-x-1 bg-white dark:bg-black px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">Name</label>
                        </div>
                            <input type='text'className="Damfont-mono border w-full max-w-xs border-black dark:border-[#616467] border-gray-300 tracking-widest  p-4 rounded-full bg-transparent" value={playlistName} placeholder="RatherPlaylist" required onInput={e=> setPlaylistName((e.target as HTMLTextAreaElement).value) }/>
                        </div>
                        <div className=" mt-4 mb-4 text-center tracking-widest Damfont-mono uppercase font-bold w-full">
                            Do you want to add similar songs to the playlist?
                            <SmallCardSelector onClick={handleRecommendation} />
                        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200 mt-10"type="button" onClick={handleCreatePlaylist}>Create Playlist</button>

                        </div>
                        
                    </>
                )}
            </div>
            </div>   
    );
}

export default PlaylistConfig;