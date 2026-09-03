import { defineField, defineType } from "sanity";

export default defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "blurb",
      title: "Blurb",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured (wider card in the grid)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "blurb", featured: "featured" },
    prepare({ title, subtitle, featured }) {
      return { title: featured ? `${title} ★` : title, subtitle };
    },
  },
});
