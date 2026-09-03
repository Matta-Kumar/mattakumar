import { defineField, defineType } from "sanity";

// "In-house capabilities" — the team-building support items shown under the
// engagement models (for clients who'd rather build the capability in-house
// than hire this out). Was TEAM_BUILDING in lib/engagement.ts.
export default defineType({
  name: "inHouseCapability",
  title: "In-House Capability",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "desc",
      title: "Description",
      type: "text",
      rows: 3,
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
    select: { title: "title", subtitle: "desc" },
  },
});
