import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const sanity = SanityClient({
  projectId: "wmqsvcft",
  dataset: "production",
  apiVersion: "2021-08-31", // use a UTC date string
  // this option enables faster responses
  // but can return stale data at times.
  // recommended for client-side queries
  useCdn: true,
});

export const imageUrlBuilder = ImageUrlBuilder(sanity);
