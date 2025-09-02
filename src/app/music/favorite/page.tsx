'use client';

import CenterBlock from '@/components/centerblock/centerblock';
import { useAppSelector } from '../../../store/store';

export default function FavoritePage() {
  const { favoriteTracks, titlePlaylist, errorMessage } = useAppSelector(
    (state) => state.tracks,
  );

  return (
    <CenterBlock
      tracks={favoriteTracks}
      title={titlePlaylist}
      errorMessage={errorMessage}
    />
  );
}
