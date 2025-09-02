'use client'

import { ReactNode } from 'react';
import styles from './layout.module.css';
import Nav from '@/components/nav/nav';
import Sidebar from '@/components/sidebar/sidebar';
import Bar from '@/components/bar/bar';
import FetchingTracks from '@/components/fetchingTracks/fetchingTracks';
import { useInitAuth } from '@/hooks/useInitAuth';

export default function MusicLayout({ children }: { children: ReactNode }) {
  useInitAuth();
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <FetchingTracks />
            <Nav />
            {children}
            <Sidebar />
          </main>
          <Bar />
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
