// types/IPosts.ts
import { SanityDocument } from "@sanity/client";

export interface IPost extends SanityDocument {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
}

// Type guard to check if a document is an IPost
export const isIPost = (doc: SanityDocument): doc is IPost => {
  return (
    typeof doc._id === "string" &&
    typeof doc._type === "string" &&
    typeof doc._rev === "string" &&
    typeof doc._createdAt === "string" &&
    typeof doc._updatedAt === "string" &&
    typeof doc.title === "string" &&
    typeof doc.slug === "string" &&
    typeof doc.publishedAt === "string" &&
    typeof doc.excerpt === "string"
  );
};
