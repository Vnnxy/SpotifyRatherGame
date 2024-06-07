'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import { Track } from '@/app/components/Track';

interface TracksContextType {
  playlistSongs: Track[];
  setPlaylistSongs: (tracks: Track[]) => void;
}

const TracksContext = createContext<TracksContextType | undefined>(undefined);

export const TracksProvider = ({ children }: { children: ReactNode }) => {
  const [playlistSongs, setPlaylistSongs] = useState<Track[]>([]);

  return (
    <TracksContext.Provider value={{ playlistSongs, setPlaylistSongs }}>
      {children}
    </TracksContext.Provider>
  );
};

export const useTracks = () => {
  const context = useContext(TracksContext);
  if (context === undefined) {
    throw new Error('useTracks must be used within a TracksProvider');
  }
  return context;
};
