import React, { useEffect, useRef } from 'react';
import { useStateValue } from '../../state';
import styles from './ThemeChangeButton.module.scss';

const ThemeChangeButton = () => {
  const [{ darkmode }, dispatch] = useStateValue();
  const setDarkmode = (value) => {
    dispatch({ type: 'SET_DARKMODE', payload: value });
  };
  const setDarkmodeRef = useRef(null);
  setDarkmodeRef.current = setDarkmode;
  useEffect(() => {
    const theme = localStorage.getItem('jukirecipes-darkmode');
    if (theme === 'true') setDarkmodeRef.current(true);
    else if (theme === 'false') setDarkmodeRef.current(false);
    else if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localStorage.setItem('jukirecipes-darkmode', String(false));
        setDarkmodeRef.current(true);
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        localStorage.setItem('jukirecipes-darkmode', String(true));
      }
    }
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem('jukirecipes-darkmode');
    if (theme && darkmode !== undefined)
      localStorage.setItem('jukirecipes-darkmode', String(darkmode));
  }, [darkmode]);

  return (
    <button
      onClick={() => setDarkmode(!darkmode)}
      className={`${styles.themeButton} ${darkmode ? styles.dark : ''}`}
    >
      <svg
        className={styles.themeIcon}
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 14C17.1325 14 14 17.1325 14 21C14 24.8675 17.1325 28 21 28C24.8675 28 28 24.8675 28 21C28 17.1325 24.8675 14 21 14Z"
          fill="#E96271"
        />
        <path
          d="M21 31.5C15.2075 31.5 10.5 26.7925 10.5 21C10.5 15.2075 15.2075 10.5 21 10.5C26.7925 10.5 31.5 15.2075 31.5 21C31.5 26.7925 26.7925 31.5 21 31.5ZM35 15.2075V7H26.7925L21 1.2075L15.2075 7H7.00002V15.2075L1.20752 21L7.00002 26.7925V35H15.2075L21 40.7925L26.7925 35H35V26.7925L40.7925 21L35 15.2075Z"
          fill="#E96271"
        />
      </svg>
    </button>
  );
};
export default ThemeChangeButton;
