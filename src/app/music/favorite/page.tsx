'use client';

import CenterBlock from '@/components/centerblock/centerblock';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useEffect, useMemo } from 'react';
import { resetFilters } from '@/store/features/trackSlice';
import { getPlaylist } from '@/utils/getPlaylist';

export default function FavoritePage() {
  const dispatch = useAppDispatch();
  const {
    favoriteTracks,
    titlePlaylist,
    errorMessage,
    filteredTracks,
    filters,
    searchTrack,
  } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const playlist = useMemo(() => {
    return getPlaylist(favoriteTracks, filteredTracks, filters, searchTrack);
  }, [favoriteTracks, filteredTracks, filters, searchTrack]);

  return (
    <CenterBlock
      tracks={playlist}
      title={titlePlaylist}
      errorMessage={errorMessage}
      pagePlaylist={favoriteTracks}
    />
  );
}

