import React from "react";
import styles from "./Filter.module.css";
const Filter = ({ children }) => {
  return <button className={styles.filterButton}>{children}</button>;
};
export default Filter;
