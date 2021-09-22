import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import RecipeList from './pages/RecipeList';
import Recipe from './pages/Recipe';
import NotFound from './pages/NotFound';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import styles from './App.module.scss';
import Wave from './components/Wave';
import ThemeChangeButton from './components/ThemeChangeButton';
import { useStateValue } from './state';
const App = () => {
  const [{ darkmode }, _] = useStateValue();
  const [hideOnScroll, setHideOnScroll] = useState(true);
  const location = useLocation();

  // Hides header on route change
  useEffect(() => {
    setHideOnScroll(true);
    setTimeout(() => setHideOnScroll(true), 100);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  // Scrollposition hook
  useScrollPosition(
    ({ prevPos: _, currPos }) => {
      const isShow = currPos.y < -400;
      if (isShow && location.pathname === '/') setHideOnScroll(false);
      else setHideOnScroll(true);
    },
    [hideOnScroll, location.pathname]
  );
  return (
    <div className={darkmode ? 'darkmode' : ''}>
      <Header
        hidden={hideOnScroll}
        style={{ display: location.pathname === '/' ? 'flex' : 'none' }}
      />
      <div
        className={`${styles.themeButtonWrapper} ${
          hideOnScroll && location.pathname === '/' ? '' : styles.hidden
        }`}
      >
        <ThemeChangeButton />
      </div>
      <Wave style={{ top: 165, right: 0 }} />
      <Wave style={{ top: 530, left: 0 }} reversed={true} />
      <main className={styles.main}>
        <div className={styles.container}>
          <Switch>
            <Route component={RecipeList} path="/jukirecipes/" exact />
            <Route component={NotFound} path="/jukirecipes/404" />
            <Route component={Recipe} path="/jukirecipes/:slug" />
          </Switch>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
