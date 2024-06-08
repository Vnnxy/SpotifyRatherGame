'use client'

import PlaylistConfig from "../components/PlaylistConfig";
import { useTracks } from "@/context/TracksContent";

/**
 * Page for the configuration of the playlist at the end of the game. 
 *
 */
export default function playlistConfiguration() {
  const { playlistSongs } = useTracks();

  return (
    <div className="w-full">
      <PlaylistConfig selectedTracks={playlistSongs} />
    </div>
  );
}