
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const communities = pgTable("communities", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const communityMemberships = pgTable("community_memberships", {
  userId: uuid("user_id").references(() => users.id),
  communityId: uuid("community_id").references(() => communities.id),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});
