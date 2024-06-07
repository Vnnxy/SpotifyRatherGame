'use client'

import PlaylistConfig from "../components/PlaylistConfig";
import { useTracks } from "@/context/TracksContent";

export default function playlistConfiguration() {
  const { playlistSongs } = useTracks();

  return (
    <div className="w-full">
      <PlaylistConfig selectedTracks={playlistSongs} />
    </div>
  );
}