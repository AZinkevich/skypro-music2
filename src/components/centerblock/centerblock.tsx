'use client';

import classnames from 'classnames';
import styles from './centerblock.module.css';
import Search from '../search/search';
import Track from '../track/track';
import FilterTrack from '../filterTrack/filterTrack';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { setPagePlaylist } from '@/store/features/trackSlice';
import { Skeleton } from '../skeleton/skeleton';

type CenterBlockProps = {
  tracks: TrackType[];   
  title: string;
  errorMessage: string;
  pagePlaylist: TrackType[];
  isLoading: boolean;
};

export default function Centerblock({
  tracks,
  title,
  pagePlaylist,
  isLoading,
}: CenterBlockProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {   
      if (!isLoading) {
      dispatch(setPagePlaylist(pagePlaylist));
    }
  }, [dispatch, pagePlaylist, isLoading]);

 
  return (
    <div className={styles.centerblock}>
      <Search />
      {isLoading ? (
        <Skeleton  />
      ) : (
        <h2 className={styles.centerblock__h2}>{title}</h2>
      )}
      <FilterTrack tracks={pagePlaylist} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classnames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>  
        </div>
        <div className={styles.content__playlist}>
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          ) : (
            tracks.map((track) => (
              <Track key={track._id} track={track} playList={tracks} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
