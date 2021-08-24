import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { sanity, imageUrlBuilder } from "../../sanity";
import SearchBar from "../SearchBar";
import Button from "../Button";
import FilterSelect from "../FilterSelect";
import styles from "./RecipeList.module.css";

const query = `
  *[ _type == 'recipe' ] { title, image, slug }
`;

const RecipeList = () => {
  // in this one line, data is fetched from sanity via the sanity client and
  // stored into application state via react-query!
  const { data: recipes } = useQuery("madLibsList", () => sanity.fetch(query));
  const [searchValue, setSearchValue] = useState("");
  const [filterValues, setFilterValues] = useState([]);

  if (recipes) {
    recipes.push(recipes[0]);
    recipes.push(recipes[0]);
    recipes.push(recipes[0]);
  }

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
        />
        <Button onClick={() => console.log(123)}>Let’s go cooooooook</Button>
      </div>
      <div className={styles.recipes}>
        {recipes ? (
          <>
            <FilterSelect values={filterValues} setValues={setFilterValues} />
            <div className={styles.list}>
              {recipes.map(({ title, slug, image }, index) => (
                <div key={slug.current + index}>
                  <Link className={styles.tile} to={`/${slug.current}`}>
                    <img
                      alt={title}
                      // use the sanity `imageUrlBuilder` to
                      // generate optimized images on the fly
                      src={imageUrlBuilder
                        .width(375)
                        .height(375)
                        .image(image)
                        .url()}
                      width="375px"
                      height="375px"
                    />
                    <h2 className={styles.tileTitle}>{title}</h2>
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>Loading</>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
