import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeList from "./components/RecipeList";
import Recipe from "./components/Recipe";
import NotFound from "./components/404";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import styles from "./App.module.css";

const App = () => {
  const [hideOnScroll, setHideOnScroll] = useState(true);

  // Scrollposition hook
  useScrollPosition(
    ({ prevPos: _, currPos }) => {
      const isShow = currPos.y < -400;
      if (isShow) setHideOnScroll(false);
      else setHideOnScroll(true);
    },
    [hideOnScroll]
  );
  return (
    <>
      <Header hidden={hideOnScroll} />

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
