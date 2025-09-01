'use client';

import Centerblock from '@/components/centerblock/centerblock';
import { useAppSelector } from '@/store/store';

export default function Home() {
  const { allTracks, titlePlaylist, errorMessage } = useAppSelector(
    (state) => state.tracks,
  );
  return (
    <Centerblock
      tracks={allTracks}
      title={titlePlaylist}
      errorMessage={errorMessage}
    />
  );
}
