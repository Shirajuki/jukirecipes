import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import ThemeChangeButton from "../ThemeChangeButton";
import styles from "./Header.module.css";
const Header = ({ hidden }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <header className={`${styles.header} ${hidden ? styles.hidden : ""}`}>
      <a className={styles.headerLink} href="/#">
        <img
          className={styles.logo}
          src="https://cdn.discordapp.com/attachments/443508931453648907/879377224472600677/unknown.png"
          alt="jukirecipes logo"
        />
      </a>
      <div className={styles.themeWrapper}>
        <SearchBar
          value={searchValue}
          setValue={setSearchValue}
          primary={true}
        />
        <ThemeChangeButton />
      </div>
    </header>
  );
};
export default Header;
