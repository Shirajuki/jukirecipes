import styles from "./Header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.headerLink} to="/">
        <img
          className={styles.heroLogo}
          src="https://cdn.discordapp.com/attachments/443508931453648907/879377224472600677/unknown.png"
          alt="jukirecipes logo"
        />
        Jukirecipes
      </Link>
    </header>
  );
};
export default Header;
