
import { pgTable, text, timestamp, uuid, boolean, pgEnum, real } from "drizzle-orm/pg-core";
import { users } from "./users";

export const answerTypeEnum = pgEnum("answer_type", ["AI", "EXPERT"]);

export const knowledgePosts = pgTable("knowledge_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  title: text("title").notNull(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const answers = pgTable("answers", {
  id: uuid("id").defaultRandom().primaryKey(),
  knowledgePostId: uuid("knowledge_post_id").references(() => knowledgePosts.id),
  userId: uuid("user_id").references(() => users.id),
  content: text("content").notNull(),
  answerType: answerTypeEnum("answer_type"),
    confidenceScore: real("confidence_score"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
