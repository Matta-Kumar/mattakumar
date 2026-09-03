import { defineField, defineType } from "sanity";

// Mirrors OfferingIconKey in components/icons/OfferingIcons.tsx — keep this
// list in sync with that file if new icons are added.
const ICON_OPTIONS = [
  "search", "cluster", "link", "sparkle", "pin", "megaphone", "browser",
  "flask", "target", "chart", "calendar", "document", "refresh", "envelope",
  "compass", "play", "chat", "code", "layers", "gauge", "wrench", "cart",
  "package", "palette", "frame", "spark",
];

export default defineType({
  name: "engagementModel",
  title: "Engagement Model",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Code",
      description: "Short code shown as a label, e.g. DIY, DWY, DFY, 1:1, CMO",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "desc",
      title: "One-liner",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "flagship",
      title: "Flagship / most popular",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "whatItIs",
      title: "What this looks like",
      description: "2-4 sentences on what this engagement model actually looks like day-to-day.",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "bestFor",
      title: "Best for",
      description: "One sentence on who/what situation this model fits.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "valueProps",
      title: "Value props",
      description: "Outcome-focused reasons to pick this model.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "includes",
      title: "What's included",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "desc", type: "text", rows: 3 }),
            defineField({
              name: "icon",
              type: "string",
              options: { list: ICON_OPTIONS },
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "icon" } },
        },
      ],
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
    select: { title: "name", subtitle: "code", flagship: "flagship" },
    prepare({ title, subtitle, flagship }) {
      return { title: flagship ? `${title} ★` : title, subtitle };
    },
  },
});
