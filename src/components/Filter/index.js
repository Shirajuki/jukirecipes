import React from "react";
import styles from "./Filter.module.scss";
const Filter = ({ selected, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.filterButton} ${selected ? styles.active : ""}`}
    >
      {children}
    </button>
  );
};
export default Filter;
