import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeList from "./components/RecipeList";
import Recipe from "./components/Recipe";
import NotFound from "./components/404";
import styles from "./App.module.css";

const App = () => {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <Switch>
            <Route component={RecipeList} path="/" exact />
            <Route component={Recipe} path="/:slug" />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default App;
