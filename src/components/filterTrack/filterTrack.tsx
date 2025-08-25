'use client';

import { useState } from 'react';
import styles from './filtertrack.module.css';
import FilterList from '../filterList/filterList';
import { TrackType } from '@/sharedTypes/sharedTypes';
import classNames from 'classnames';
import styled from '../filterList/filterList.module.css';
import FilterLengthList from '../filterLengthList/filterLengthList';

type FilterTrackProp = {
  tracks: TrackType[];
};

export default function FilterTrack({ tracks }: FilterTrackProp) {
  const [openFilterListModal, setOpenFilterListModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);

  const trackKeys = Object.keys(tracks) as (keyof TrackType)[];
  const [filterListByKey, setFilterListByKey] = useState<keyof TrackType>(
   trackKeys[1],
   // "_id"
  );

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
          <FilterList tracks={tracks} keyOfList={filterListByKey} />
        )}
        {openFilterListModal && filterListByKey === 'author' && (
          <FilterLengthList tracks={tracks} lengthList={filterListByKey} />
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
          <div className={styled.filter__content}>
            <div className={styled.filter__list}>
              <p className={styled.filter__track}>Сначала новые</p>
              <p className={styled.filter__track}>Сначала старые</p>
              <p className={styled.filter__track}>По умолчанию</p>
            </div>
          </div>
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
          <FilterList tracks={tracks} keyOfList={filterListByKey} />
        )}
        {openFilterListModal && filterListByKey === 'genre' && (
          <FilterLengthList tracks={tracks} lengthList={filterListByKey} />
        )}
      </div>
    </div>
  );
}
