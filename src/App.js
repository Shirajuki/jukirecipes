import { Route, Switch, Link } from "react-router-dom";
import RecipeList from "./RecipeList";
import Recipe from "./Recipe";
import NotFound from "./404";
import styles from "./App.module.css";

const App = () => {
  return (
    <>
      <header className={styles.header}>
        <Link className={styles.headerLink} to="/">
          Jukirecipes
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <Switch>
            <Route component={RecipeList} path="/" exact />
            <Route component={Recipe} path="/:slug" />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Created with Vercel + Sanity + React</p>
      </footer>
    </>
  );
};

export default App;
