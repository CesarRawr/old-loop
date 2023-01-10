import React from 'react';
import {Header} from '../../features/@ui';
import styles from './UserLayout.module.css';

// This layout contains a header with not admin options
export default function UserLayout({children}: UserLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <main>
        {
          children
        }
      </main>
    </div>
  );
}

interface UserLayoutProps {
  children: JSX.Element | JSX.Element[];
}
