import classnames from 'classnames';
import styles from './centerblock.module.css';
import Search from '../search/search';
import { data } from '@/data';
import Track from '../track/track';

import FilterTrack from '../filterTrack/filterTrack';

export default function Centerblock() {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <FilterTrack />
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
          {data.map((track) => (
            <Track track={track} key={track._id} playList={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
