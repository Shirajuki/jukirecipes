import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { sanity, imageUrlBuilder } from "./sanity";
import styles from "./RecipeList.module.css";

const query = `
  *[ _type == 'recipe' ] { title, image, slug }
`;

function RecipeList() {
  // in this one line, data is fetched from sanity via the sanity client and
  // stored into application state via react-query!
  const { data: recipes } = useQuery("madLibsList", () => sanity.fetch(query));

  // if we don't have madLibs yet, then the data must be loading
  if (!recipes) {
    return <h1>Loading…</h1>;
  } else {
    recipes.push(recipes[0]);
    recipes.push(recipes[0]);
    recipes.push(recipes[0]);
  }

  return (
    <div className={styles.listWrapper}>
      <div className={styles.list}>
        {/* loop through all of the mabLib and show them in a list */}
        {recipes.map(({ title, slug, image }) => (
          <div key={slug.current}>
            {/* ;ink comes from react-router and it powers navigation on the */}
            {/* site. here we use sanity slugs to create unique URLs. */}
            <Link className={styles.tile} to={`/${slug.current}`}>
              <img
                alt={title}
                // use the sanity `imageUrlBuilder` to
                // generate optimized images on the fly
                src={imageUrlBuilder.width(375).height(375).image(image).url()}
                width="375px"
                height="375px"
              />
              <h2 className={styles.tileTitle}>{title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
