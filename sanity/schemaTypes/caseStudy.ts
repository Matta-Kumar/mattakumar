import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "client",
      title: "Client descriptor",
      description:
        'Keep this generic/illustrative unless the case study is a real, approved client engagement — e.g. "Sample — D2C skincare brand", not an invented specific brand name.',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "client", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "isReal",
      title: "This is a real, verified case study",
      description:
        "Leave off for illustrative/sample cases. Only turn on once a client has actually approved these numbers for publication.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "metric",
      title: "Headline metric",
      description: 'e.g. "+212%", "3.1x"',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "line",
      title: "Metric line",
      description: "One line describing what the metric measures.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "services",
      title: "Services tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "situation",
      title: "Situation",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "approach",
      title: "Approach",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "outcome",
      title: "Outcome",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "note",
      title: "Visual note (internal)",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
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
    select: { title: "client", subtitle: "metric", media: "image", isReal: "isReal" },
    prepare({ title, subtitle, media, isReal }) {
      return { title, subtitle: `${isReal ? "✅ Real" : "🧪 Illustrative"} — ${subtitle}`, media };
    },
  },
});
