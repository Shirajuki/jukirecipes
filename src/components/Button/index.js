import React from "react";
import styles from "./Button.module.scss";
const Button = ({ onClick, children, style }) => {
  return (
    <button
      style={style ? style : {}}
      className={styles.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
