
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { knowledgePosts } from "./knowledge";

export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  color: text("color"),
});

export const postTags = pgTable("post_tags", {
  postId: uuid("post_id").references(() => knowledgePosts.id),
  tagId: uuid("tag_id").references(() => tags.id),
});
