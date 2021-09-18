import React from "react";
import SearchBar from "../SearchBar";
import ThemeChangeButton from "../ThemeChangeButton";
import { useStateValue } from "../../state";
import styles from "./Header.module.scss";

const Header = ({ hidden, style }) => {
  const [{ searchValue }, dispatch] = useStateValue();
  const setSearchValue = (value) => {
    dispatch({ type: "SET_SEARCH_VALUE", payload: value });
  };
  const setSearched = (value) => {
    dispatch({ type: "SET_SEARCHED", payload: value });
  };
  const setLoading = (value) => {
    dispatch({ type: "SET_LOADING", payload: value });
  };
  const search = (value) => {
    setTimeout(() => setLoading(false), 1000);
    setSearched(value);
    return true;
  };
  const goToRecipeList = () => {
    if (search(searchValue)) {
      document.querySelector("header").scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      setLoading(true);
    }
  };
  return (
    <header
      className={`${styles.header} ${hidden ? styles.hidden : ""}`}
      style={style ?? {}}
    >
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
          onClick={() => goToRecipeList()}
        />
        <ThemeChangeButton />
      </div>
    </header>
  );
};
export default Header;
