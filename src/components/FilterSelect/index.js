import React from "react";
import Filter from "../Filter";
import styles from "./FilterSelect.module.css";
const FilterSelect = ({ value, setValue }) => {
  return (
    <div className={styles.filterWrapper}>
      <Filter>Pasta</Filter>
      <Filter>Noodle</Filter>
      <Filter>Soup</Filter>
      <Filter>Rice</Filter>
      <Filter>Cake</Filter>
      <Filter>Desert</Filter>
    </div>
  );
};
export default FilterSelect;
