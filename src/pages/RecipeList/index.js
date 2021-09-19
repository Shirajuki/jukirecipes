import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { sanity, imageUrlBuilder } from '../../sanity';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/Button';
import FilterSelect from '../../components/FilterSelect';
import Spinner from '../../components/Spinner';
import styles from './RecipeList.module.scss';
import { useStateValue } from '../../state';

const query = `
  *[ _type == 'recipe' ] { title, image, slug, tags, instructions, ingredients }
`;
const filterValueList = ['pasta', 'noodle', 'soup', 'rice', 'desert'];
const normalizeLower = (value) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
const RecipeList = () => {
  // in this one line, data is fetched from sanity via the sanity client and
  // stored into application state via react-query!
  const { data: recipes } = useQuery('recipeList', () => sanity.fetch(query));
  const [{ searchValue, searched, loading }, dispatch] = useStateValue();
  const setSearchValue = (value) => {
    dispatch({ type: 'SET_SEARCH_VALUE', payload: value });
  };
  const setSearched = (value) => {
    dispatch({ type: 'SET_SEARCHED', payload: value });
  };
  const setLoading = (value) => {
    dispatch({ type: 'SET_LOADING', payload: value });
  };
  const [filterValues, setFilterValues] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const listRef = useRef(null);
  const searchValueRef = useRef(searchValue);
  searchValueRef.current = searchValue;

  useEffect(() => {
    const filterRecipes = (recipes, filters) => {
      if (filters.length === 0 && searched === '') return recipes;
      else
        return recipes.filter((r) => {
          let bool = false;
          for (let i = 0; i < (r?.tags?.length ?? 0); i++) {
            if (filters.includes(r.tags[i].toLowerCase())) bool = true;
          }
          if (
            !normalizeLower(r.title).includes(normalizeLower(searchValueRef.current)) ||
            (searchValueRef.current === '' && bool === false)
          )
            bool = false;
          else bool = true;
          return bool;
        });
    };
    setFilteredRecipes(filterRecipes(recipes, filterValues) || []);
  }, [recipes, filterValues, searched]);

  const search = (value) => {
    setTimeout(() => setLoading(false), 1000);
    setSearched(value);
    return true;
  };
  const goToRecipeList = () => {
    if (search(searchValue)) {
      setLoading(true);
    }
    listRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  };
  if (recipes) recipes.push(recipes[0]);
  return (
    <div className={styles.listWrapper}>
      <div className={styles.heroWrapper}>
        <img
          className={styles.heroLogo}
          src="https://cdn.discordapp.com/attachments/443508931453648907/879377259939635292/unknown.png"
          alt="jukirecipes logo"
        />
        <h1>Jukirecipes</h1>
        <p>The infamous open-source recipe book.</p>
        <p>Aka my journey in mastering the kitchen.</p>
        <SearchBar
          value={searchValue}
          setValue={setSearchValue}
          style={{ margin: 20, marginTop: 25 }}
          onClick={() => goToRecipeList()}
        />
        <div className={styles.buttonWrapper}>
          <Button onClick={() => goToRecipeList()}>Let’s go cooooooook</Button>
        </div>
      </div>
      <div className={styles.recipes}>
        {recipes ? (
          <>
            <h3 className={styles.filterTitleText}>Filters:</h3>
            <FilterSelect
              selected={filterValues}
              setSelected={setFilterValues}
              values={filterValueList}
            />
            <div className={styles.list} ref={listRef}>
              {loading ? (
                <Spinner />
              ) : filteredRecipes.length > 0 ? (
                filteredRecipes.map(
                  ({ title, slug, image, instructions, ingredients, tags }, index) => (
                    <div key={slug.current + index}>
                      <Link className={styles.tile} to={`/${slug.current}`}>
                        <img
                          alt={title}
                          // use the sanity `imageUrlBuilder` to
                          // generate optimized images on the fly
                          src={imageUrlBuilder.width(375).height(375).image(image).url()}
                          width="300px"
                          height="300px"
                        />
                        <h2 className={styles.tileTitle}>{title}</h2>
                        <div className={styles.filterDisplay}>
                          <FilterSelect
                            selected={tags}
                            setSelected={() => void 0}
                            values={tags}
                            readOnly={true}
                            rounded={true}
                          />
                        </div>
                        <p className={styles.tileInstructionCount}>
                          {instructions.length === 1
                            ? `${instructions.length} Step`
                            : `${instructions.length} Steps`}
                        </p>
                        <p className={styles.tileIngredientCount}>
                          {ingredients.length === 1
                            ? `${ingredients.length} Ingredient`
                            : `${ingredients.length} Ingredients`}
                        </p>
                      </Link>
                    </div>
                  )
                )
              ) : (
                <p className={styles.notFound}>
                  <i>No recipes was found on this filter/search combination...</i>
                </p>
              )}
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default RecipeList;
