'use client'
import { useRouter, useSearchParams } from "next/navigation";
import PlaylistConfig from "../components/PlaylistConfig";
import { Track } from "../components/Track";

export default function playlistConfiguration() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const playlistSongs = searchParams.get("playlistSongs");
  const parsedPlaylistSongs: Track[] = playlistSongs ? JSON.parse(playlistSongs as string) : [];

  return (
    <div className="w-full">
      <PlaylistConfig selectedTracks={parsedPlaylistSongs} />
    </div>
  );
}