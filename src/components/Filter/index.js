import React from "react";
import styles from "./Filter.module.css";
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
