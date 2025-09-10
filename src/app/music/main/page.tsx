'use client';

import Centerblock from '@/components/centerblock/centerblock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { resetFilters, setPagePlaylist } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getPlaylist } from '@/utils/getPlaylist';
import { useEffect, useMemo, useState } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  const { allTracks, titlePlaylist, errorMessage, filteredTracks, filters, searchTrack } = useAppSelector(
    (state) => state.tracks,
  );
  

  useEffect(() => {
    dispatch(resetFilters());
    // const currentPlayList = filters.authors.length ? filteredTracks : allTracks;
    // setPlayList(currentPlayList);
  }, [dispatch])

 const playlist = useMemo(() => {
    return getPlaylist(allTracks, filteredTracks, filters, searchTrack);
  }, [allTracks, filteredTracks, filters, searchTrack]);


  return (
    <Centerblock
      tracks={playlist}
      title={titlePlaylist}
      errorMessage={errorMessage}
      pagePlaylist={allTracks}
    />
  );
}
