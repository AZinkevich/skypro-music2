import classnames from 'classnames';
import styles from './centerblock.module.css';
import Search from '../search/search';
import Track from '../track/track';
import FilterTrack from '../filterTrack/filterTrack';
import { TrackType } from '@/sharedTypes/sharedTypes';

type CenterBlockProps = {
  tracks: TrackType[];
  title: string;
  errorMessage: string;
};

export default function Centerblock({
  tracks,
  title,
}: CenterBlockProps) {
 
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <FilterTrack tracks={tracks} />
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
          {tracks.map((track) => (
            <Track track={track} key={track._id} playList={tracks} />
          ))}
        </div>
      </div>
    </div>
  );
}
