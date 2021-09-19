import React from 'react';
import styles from './Filter.module.scss';
const Filter = ({ selected, onClick, children, readOnly = false, rounded = false }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.filterButton} ${selected ? styles.active : ''} ${
        readOnly ? styles.readOnly : ''
      } ${rounded ? styles.rounded : ''}`}
    >
      {children}
    </button>
  );
};
export default Filter;
