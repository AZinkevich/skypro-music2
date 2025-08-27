import { TrackType } from '@/sharedTypes/sharedTypes';
import { data } from '@/data';
import styles from './filterLengthList.module.css';
import { getUniqueValuesByKey } from '@/utils/helper';

type LengthListProp = {
  lengthList: keyof TrackType;
  tracks: TrackType[];
};

export default function FilterLengthList({ lengthList, tracks }: LengthListProp) {
  const filteredList = getUniqueValuesByKey(tracks, lengthList);
  return <div className={styles.filter__length}>{filteredList.length}</div>;
}