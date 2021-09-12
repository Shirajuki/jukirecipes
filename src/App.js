import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeList from "./pages/RecipeList";
import Recipe from "./pages/Recipe";
import NotFound from "./pages/NotFound";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import styles from "./App.module.scss";
import Wave from "./components/Wave";

const App = () => {
  const [hideOnScroll, setHideOnScroll] = useState(true);
  const location = useLocation();

  // Hides header on route change
  useEffect(() => {
    setHideOnScroll(true);
    setTimeout(() => setHideOnScroll(true), 100);
  }, [location.pathname]);

  // Scrollposition hook
  useScrollPosition(
    ({ prevPos: _, currPos }) => {
      const isShow = currPos.y < -400;
      if (isShow && location.pathname === "/") setHideOnScroll(false);
      else setHideOnScroll(true);
    },
    [hideOnScroll, location.pathname]
  );
  return (
    <>
      <Header
        hidden={hideOnScroll}
        style={{ display: location.pathname === "/" ? "flex" : "none" }}
      />
      <Wave style={{ top: 165, right: 0 }} />
      <Wave style={{ top: 530, left: 0 }} reversed={true} />
      <main className={styles.main}>
        <div className={styles.container}>
          <Switch>
            <Route component={RecipeList} path="/" exact />
            <Route component={NotFound} path="/404" />
            <Route component={Recipe} path="/:slug" />
          </Switch>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default App;
