// types/IPosts.ts
import { SanityDocument } from "@sanity/client";

export interface IPost extends SanityDocument {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
}
