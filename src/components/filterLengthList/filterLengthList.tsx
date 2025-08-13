import { TrackType } from '@/sharedTypes/sharedTypes';
import { data } from '@/data';
import styles from './filterLengthList.module.css';
import { getUniqueValuesByKey } from '@/utils/helper';

type LengthListProp = {
  lengthList: keyof TrackType;
};

export default function FilterLengthList({ lengthList }: LengthListProp) {
  const filteredList = getUniqueValuesByKey(data, lengthList);
  return <div className={styles.filter__length}>{filteredList.length}</div>;
}