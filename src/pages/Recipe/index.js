import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import BlockContent from '@sanity/block-content-to-react';
import { sanity, imageUrlBuilder } from '../../sanity';
import styles from './Recipe.module.scss';
import FilterSelect from '../../components/FilterSelect';
import Ingredient from '../../components/Ingredient';
import Button from '../../components/Button';
import { Redirect } from 'react-router-dom';

const query = `
  *[ _type == 'recipe' && slug.current == $slug ]
`;

const images = ['a', 'b', 'c', 'd'];
const Recipe = () => {
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [toggledIngredients, setToggledIngredients] = useState(false);
  const { slug } = useParams();
  useEffect(() => {
    setCheckedIngredients([]);
  }, [slug]);

  const updateCheckedIngredients = (ingredient) => {
    const nchecked = checkedIngredients.includes(ingredient)
      ? checkedIngredients.filter((i) => i !== ingredient)
      : [...checkedIngredients, ingredient];
    setCheckedIngredients(nchecked);
  };
  const toggleIngredients = () => {
    setToggledIngredients(!toggledIngredients);
  };

  // data is fetched from sanity via the sanity client and stored into
  // application state via react-query. note that the slug is used as the
  // "query key": https://react-query.tanstack.com/guides/query-keys
  const { data } = useQuery(slug, () => sanity.fetch(query, { slug }));
  if (data?.length === 0) {
    return <Redirect to="/404" />;
  }

  const [recipe] = data ?? [];
  if (!recipe) {
    return <h1>Loading…</h1>;
  }
  const ingredients = recipe.ingredients.map((r) => r.children[0].text);

  return (
    <div className={styles.recipeWrapper}>
      <div className={styles.recipeInfoWrapper}>
        <Link className={styles.returnButton} to="/">
          <svg
            width="39"
            height="20"
            viewBox="0 0 39 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.72562 7.44245H39V12.3317H9.72562V19.6657L0 9.8871L9.72562 0.108505V7.44245Z"
              fill="#E96271"
            />
          </svg>
        </Link>
        <div className={styles.recipeInfo}>
          <img
            className={styles.img}
            alt={recipe.title}
            src={imageUrlBuilder.width(240).height(240).image(recipe.image).url()}
          />
          <div className={styles.recipeInfoDiv}>
            <div>
              <h1 className={styles.title}>{recipe.title}</h1>
              <div className={styles.filterDisplay}>
                <FilterSelect
                  selected={recipe.tags}
                  setSelected={() => void 0}
                  values={recipe.tags}
                  readOnly={true}
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Button onClick={toggleIngredients}>Show ingredients</Button>
              </div>
            </div>
            <div className={styles.imageGallery}>
              {images.map((image, index) => (
                <img
                  key={image + index}
                  className={styles.img}
                  alt={recipe.title}
                  src={imageUrlBuilder.width(80).height(80).image(recipe.image).url()}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.recipeInstructions}>
          <h2>Instructions</h2>
          <BlockContent className={styles.blockContent} blocks={recipe.instructions} />
        </div>
      </div>
      <div
        className={`${styles.recipeIngredientsWrapper} ${
          toggledIngredients ? styles.toggledIngredients : ''
        }`}
      >
        <h2>Ingredients</h2>
        {ingredients.map((ingredient, index) => (
          <Ingredient
            key={ingredient + index}
            ingredient={ingredient}
            checked={checkedIngredients.includes(ingredient)}
            onChange={() => updateCheckedIngredients(ingredient)}
          />
        ))}
      </div>
      <div className={styles.hiddenIngredientsWrapper} onClick={toggleIngredients}></div>
    </div>
  );
};

export default Recipe;
