import React from 'react';
import styles from './Ingredient.module.scss';

const Ingredient = ({ ingredient, checked, onChange }) => {
  return (
    <div className={styles.ingredientWrapper}>
      <input
        id={ingredient}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.ingredientCheckbox}
      />
      <label htmlFor={ingredient} className={styles.ingredientLabel}>
        {ingredient}
      </label>
    </div>
  );
};
export default Ingredient;
