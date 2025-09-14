'use client';

import Centerblock from '@/components/centerblock/centerblock';
import { resetFilters } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getPlaylist } from '@/utils/getPlaylist';
import { useEffect, useMemo } from 'react';

export default function CategoryPage() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const { 
    collectionTracks, 
    titlePlaylist, 
    errorMessage, 
    filteredTracks, 
    filters, 
    searchTrack, 
  } = useAppSelector(
    (state) => state.tracks,
  );

   useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const playlist = useMemo(() => {
    return getPlaylist(collectionTracks, filteredTracks, filters, searchTrack);
  }, [collectionTracks, filteredTracks, filters, searchTrack]);


  return <Centerblock
      tracks={playlist}
      title={titlePlaylist}
      errorMessage={errorMessage}
      pagePlaylist={collectionTracks}
      isLoading={isLoading}
       />;
}
