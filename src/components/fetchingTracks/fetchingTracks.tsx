'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import {
  getFavoriteTracks,
  getSelectionTracks,
  getTracks,
} from '@/services/tracks/tracksApi';
import {
  setAllTracks,
  setCollectionTracks,
  setErrorMessage,
  setFavoriteTracks,
  setTitlePlaylist,
} from '@/store/features/trackSlice';
import { AxiosError } from 'axios';
import { useParams, usePathname } from 'next/navigation';
import { SelectionTrackType } from '@/sharedTypes/sharedTypes';
import { withReauth } from '@/utils/withReAuth';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state) => state.tracks);
  const params = useParams<{ id: string }>();
  const pathname = usePathname();
  const [selectionTracks, setSelectionTracks] =
    useState<SelectionTrackType | null>(null);
  const { access, refresh } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (pathname === '/music/main') {
      dispatch(setErrorMessage(''));
      getTracks()
        .then((res) => {
          dispatch(setAllTracks(res));
          dispatch(setTitlePlaylist('Треки'));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              dispatch(setErrorMessage(error.response.data));
              console.log(error.response.data);
            } else if (error.request) {
              dispatch(
                setErrorMessage(
                  'Похоже, что-то с интернет-соединением. Попробуйте позже',
                ),
              );
            } else {
              setErrorMessage(
                'Неизвестная ошибка. Попробуйте перезагрузить страницу',
              );
            }
          }
        })
        .finally(() => {});
    }
  }, [dispatch, pathname]);

  useEffect(() => {
    if (params.id && pathname.startsWith('/music/category/')) {
      dispatch(setErrorMessage(''));
      getSelectionTracks(params.id)
        .then((res) => {
          setSelectionTracks(res);
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              dispatch(setErrorMessage(error.response.data));
              console.log(error.response.data);
            } else if (error.request) {
              dispatch(
                setErrorMessage(
                  'Похоже, что-то с интернет-соединением. Попробуйте позже',
                ),
              );
            } else {
              dispatch(
                setErrorMessage(
                  'Неизвестная ошибка. Попробуйте перезагрузить страницу',
                ),
              );
            }
          }
        })
        .finally(() => {});
    }
  }, [dispatch, pathname, params.id]);

  useEffect(() => {
    if (selectionTracks && pathname.startsWith('/music/category/')) {
      if (!allTracks.length) {
        setErrorMessage('Не удалось получить список треков');
      }
      const selection = allTracks.filter((track) =>
        selectionTracks.items.includes(track._id),
      );
      dispatch(setCollectionTracks(selection));
      dispatch(setTitlePlaylist(selectionTracks.name));
    }
  }, [dispatch, pathname, allTracks, selectionTracks]);

  useEffect(() => {
    if (pathname === '/music/favorite') {
      dispatch(setErrorMessage(''));
      withReauth(
        () =>
          getFavoriteTracks(access)
            .then((res) => {
              dispatch(setFavoriteTracks(res));
              dispatch(setTitlePlaylist('Мой плейлист'));
              dispatch(setErrorMessage(''));
            })
            .catch((error) => {
              if (error instanceof AxiosError) {
                if (error.response) {
                  dispatch(setErrorMessage(error.response.data.message));
                  console.log(error.response.data);
                } else if (error.request) {
                  dispatch(
                    setErrorMessage(
                      'Похоже, что-то с интернет-соединением. Попробуйте позже',
                    ),
                  );
                } else {
                  setErrorMessage(
                    'Неизвестная ошибка. Попробуйте перезагрузить страницу',
                  );
                }
              }
            })
            .finally(() => {}),
        refresh,
        dispatch,
      );
    }
  }, [dispatch, pathname, access, refresh]);

  return <></>;
}
