const recipe = {
  name: "recipe",
  title: "Recipes",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Image",
      name: "image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Ingredients",
      name: "ingredients",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Instructions",
      name: "instructions",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default recipe;
