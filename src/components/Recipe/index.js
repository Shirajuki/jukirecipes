import React from "react";
import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";
import { sanity, imageUrlBuilder } from "../../sanity";
import styles from "./Recipe.module.css";

const query = `
  *[ _type == 'recipe' && slug.current == $slug ]
`;

const Recipe = () => {
  // this variable is populated from `react-router` which pulls it from the URL
  const { slug } = useParams();

  // data is fetched from sanity via the sanity client and stored into
  // application state via react-query. note that the slug is used as the
  // "query key": https://react-query.tanstack.com/guides/query-keys
  const { data = [] } = useQuery(slug, () => sanity.fetch(query, { slug }));

  // we'll use destructuring assignment to return the first mab lib
  const [recipe] = data;

  if (!recipe) {
    return <h1>Loading…</h1>;
  }

  // once the mad lib is loaded, we can map through the structured content to
  // find our placeholder shape. the end result is an array of these placeholders
  return (
    <>
      <h2 className={styles.title}>{recipe.title}</h2>
      <img
        className={styles.img}
        alt={recipe.title}
        src={imageUrlBuilder.width(425).height(425).image(recipe.image).url()}
      />
      <BlockContent
        className={styles.blockContent}
        blocks={recipe.ingredients}
      />
      <BlockContent
        className={styles.blockContent}
        blocks={recipe.instructions}
      />

      {/* this is a simple link back to the main mab libs index */}
      <Link className={styles.button} to="/">
        ← More Recipes
      </Link>
    </>
  );
};

export default Recipe;
