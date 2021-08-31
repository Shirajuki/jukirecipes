import React from "react";
import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
export default Spinner;
