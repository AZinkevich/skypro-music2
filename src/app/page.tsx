import styles from './page.module.css';
import Bar from '@/components/bar/bar';
import Nav from '@/components/nav/nav';
import Centerblock from '@/components/centerblock/centerblock';
import Sidebar from '@/components/sidebar/sidebar';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <Centerblock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
