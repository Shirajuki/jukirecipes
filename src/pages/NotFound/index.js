import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h1>404</h1>
      <h2>I'm Sorry</h2>
      <p>We couldn't find the page you were looking for. </p>
      <Link to={'/jukirecipes/'}>
        <Button
          style={{ margin: 20, paddingLeft: 60, paddingRight: 60 }}
          onClick={() => void 0}
        >
          Click here to return to the homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
