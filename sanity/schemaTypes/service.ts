import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "n",
      title: "Number label",
      type: "string",
      description: 'Two-digit display number, e.g. "01"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "benefit",
      title: "Benefit (one-liner)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "desc",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables (short pill labels)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "whatItIs",
      title: "What this is",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "valueProps",
      title: "Value props",
      description: "Outcome-focused reasons to pick this service.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "offerings",
      title: "Offerings",
      description: "Detailed offerings shown on the service detail page.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "desc", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "desc" } },
        },
      ],
    }),
    defineField({
      name: "visualNote",
      title: "Visual note (internal)",
      description: "Notes for whoever sources the image — not shown on the site.",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
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
    select: { title: "title", subtitle: "benefit", media: "image" },
  },
});
