'use client';

import { useState } from 'react';
import styles from './filtertrack.module.css';
import FilterList from '../filterList/filterList';
import { TrackType } from '@/sharedTypes/sharedTypes';
import classNames from 'classnames';
import FilterLengthList from '../filterLengthList/filterLengthList';
import { useAppDispatch } from '@/store/store';
import { setFilterAuthors, setFilterGenres, setSortingYears } from '@/store/features/trackSlice';
import { getUniqueValuesByKey } from '@/utils/helper';

type FilterTrackProp = {
  tracks: TrackType[];
};

export default function FilterTrack({ tracks }: FilterTrackProp) {
  const [openFilterListModal, setOpenFilterListModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);
  const dispatch = useAppDispatch();
  const [selectAuthors, setSelectAuthors] = useState<string[]>([]);
  const [selectGenres, setSelectGenres] = useState<string[]>([]);
  const [selectYear, setSelectYear] = useState<string>('По умолчанию');

  const trackKeys = Object.keys(tracks) as (keyof TrackType)[];
  const [filterListByKey, setFilterListByKey] = useState<keyof TrackType>(
   trackKeys[1],
  );

  const uniqueAuthors = getUniqueValuesByKey(tracks, 'author');
  const uniqueGenres = getUniqueValuesByKey(tracks, 'genre');
  const yearsValue = ['Сначала новые', 'Сначала старые', 'По умолчанию'];

  const onOpenFilterList = (key: keyof TrackType) => {
    setFilterListByKey(key);
    setActiveFilter(true);

    if (!openFilterListModal) {
      setOpenFilterListModal(true);
    } else if (openFilterListModal && filterListByKey === key) {
      setOpenFilterListModal(false);
      setActiveFilter(false);
    } else {
      setFilterListByKey(key);
    }
  };

   const onSelectAuthor = (author: string) => {
    dispatch(setFilterAuthors(author));
    setSelectAuthors((prev) => {
      if (prev.includes(author)) {
        return prev.filter((item) => item !== author);
      } else {
        return [...prev, author];
      }
    });
  };

  const onSelectYears = (year: string) => {
    dispatch(setSortingYears(year));
    setSelectYear(year);
  };

  const onSelectGenres = (genres: string) => {
    dispatch(setFilterGenres(genres));
    setSelectGenres((prev) => {
      if (prev.includes(genres)) {
        return prev.filter((item) => item !== genres);
      } else {
        return [...prev, genres];
      }
    });
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      <div className={styles.filter__container}>
        <div
          onClick={() => onOpenFilterList('author')}
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter && filterListByKey === 'author',
          })}
        >
          исполнителю
        </div>
        {openFilterListModal && filterListByKey === 'author' && (
          <FilterList onSelect={onSelectAuthor}
            selectItems={selectAuthors}
            list={uniqueAuthors} />
        )}
        {openFilterListModal && filterListByKey === 'author' && (
          <FilterLengthList list={selectAuthors} />
        )}
      </div>

      <div className={styles.filter__container}>
        <div
          onClick={() => onOpenFilterList('release_date')}
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter && filterListByKey === 'release_date',
          })}
        >
          году выпуска
        </div>
        {openFilterListModal && filterListByKey === 'release_date' && (
         <FilterList
            onSelect={onSelectYears}
            selectItems={[selectYear]}
            list={yearsValue}
          />
        )}
         {openFilterListModal && filterListByKey === 'release_date' && (
          <FilterLengthList list={[selectYear]} />
        )}       
      </div>

      <div className={styles.filter__container}>
        <div
          onClick={() => onOpenFilterList('genre')}
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter && filterListByKey === 'genre',
          })}
        >
          жанру
        </div>
        {openFilterListModal && filterListByKey === 'genre' && (
          <FilterList
            onSelect={onSelectGenres}
            selectItems={selectGenres}
            list={uniqueGenres} />
        )}
        {openFilterListModal && filterListByKey === 'genre' && (
          <FilterLengthList list={selectGenres} />
        )}
      </div>
    </div>
  );
}
