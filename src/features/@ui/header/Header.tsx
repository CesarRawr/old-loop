import React from 'react';
import styles from './Header.module.css';
import HamburgerMenu from '../hamburgerMenu/HamburgerMenu';

export default function Header() {
  return (
    <header className={styles.header}>
      <HamburgerMenu />
      <span className={styles.logo}>Loop</span>
    </header>
  );
}
