import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Published content only, no drafts — fine for a public marketing site
  // with no preview mode set up. Revalidation is handled per-fetch via
  // Next's own `next: { revalidate, tags }`, matching lib/wordpress.ts.
  useCdn: true,
});
