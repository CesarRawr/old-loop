import {useState} from 'react';
import styles from './HamburgerMenu.module.css';
import {userOptions} from './HamburgerMenuOptions';

import type {MouseElementEvent, MouseElementFunction} from '@models/types';

export default function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Parsing options to dropdown elements
  const menuOptions: JSX.Element[] = userOptions.map(({name, link}, index) => {
    return (
      <li key={index}>
        <a className={styles.dropdownBtn} href={link}>{name}</a>
      </li>
    );
  });

  // Display dropdown element
  const onMouseOver: MouseElementFunction = (e: MouseElementEvent) => {
    const dropdown: HTMLElement = e.currentTarget.lastChild as HTMLElement;
    
    if (!!dropdown) {
      if (!isMenuOpen) {
        setIsMenuOpen(true);
        dropdown.style.display = 'block';
      }
    }
  }

  const onMouseLeave: MouseElementFunction = (e: MouseElementEvent) => {
    const dropdown: HTMLElement = e.currentTarget.lastChild as HTMLElement;
    
    if (!!dropdown) {
      if (isMenuOpen) {
        setIsMenuOpen(false);
        dropdown.style.display = 'none';
      }
    }
  }

  return (
    <nav className={styles.nav} 
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}>
      
      <span className="material-symbols-outlined md-40">menu</span>
      <ul className={styles.dropdown}>
        {
          menuOptions
        }
      </ul>

    </nav>
  );
}
