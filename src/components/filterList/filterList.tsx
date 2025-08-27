import { getUniqueValuesByKey } from '@/utils/helper';
import styles from './filterlist.module.css';
import { TrackType } from '@/sharedTypes/sharedTypes';

type FilterProp = {
  keyOfList: keyof TrackType;
  tracks: TrackType[];
};

export default function FilterList({ keyOfList, tracks }: FilterProp) {
  const filteredList = getUniqueValuesByKey(tracks, keyOfList);
  return (
    <div className={styles.filter__content}>
      <div className={styles.filter__list}>
        {filteredList.map((item) => (
          <p className={styles.filter__track} key={item}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}