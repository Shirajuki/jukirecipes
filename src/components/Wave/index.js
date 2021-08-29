import React from "react";
import styles from "./Wave.module.scss";

const Wave = ({ reversed, style }) => {
  return (
    <svg
      style={style ?? {}}
      className={`${styles.wave} ${reversed ? styles.reversed : ""}`}
      width="192"
      height="93"
      viewBox="0 0 192 93"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 28.839C3.21795 2.04411 27.5769 2.04414 27.5769 2.04414C51.9359 2.0442 59.2436 28.839 81.1667 28.839C103.09 28.839 109.179 4.48012 134.756 2.04414C160.333 0.826219 167.641 25.1852 192 28.839"
        stroke="#FFDFAC"
        stroke-width="4"
      />
      <path
        d="M2 59.839C3.21795 33.0441 27.5769 33.0441 27.5769 33.0441C51.9359 33.0442 59.2436 59.839 81.1667 59.839C103.09 59.839 109.179 35.4801 134.756 33.0441C160.333 31.8262 167.641 56.1852 192 59.839"
        stroke="#FFDFAC"
        stroke-width="4"
      />
      <path
        d="M2 90.839C3.21795 64.0441 27.5769 64.0441 27.5769 64.0441C51.9359 64.0442 59.2436 90.839 81.1667 90.839C103.09 90.839 109.179 66.4801 134.756 64.0441C160.333 62.8262 167.641 87.1852 192 90.839"
        stroke="#FFDFAC"
        stroke-width="4"
      />
    </svg>
  );
};

export default Wave;
