import React from "react";
import styles from "./Filter.module.css";
const Filter = ({ selected, children }) => {
  return (
    <button
      className={`${styles.filterButton} ${selected ? styles.active : ""}`}
    >
      {children}
    </button>
  );
};
export default Filter;
