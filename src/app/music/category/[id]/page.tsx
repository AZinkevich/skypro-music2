'use client';

import Centerblock from '@/components/centerblock/centerblock';
import { useAppSelector } from '@/store/store';

export default function CategoryPage() {
  const { collectionTracks, titlePlaylist, errorMessage } = useAppSelector(
    (state) => state.tracks,
  );
  return <Centerblock
      tracks={collectionTracks}
      title={titlePlaylist}
      errorMessage={errorMessage} />;
}
