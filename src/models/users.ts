import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  walletAddress: text("wallet_address").unique().notNull(),
  username: text("username").unique(),
  avatarUrl: text("avatar_url"),
  trustScore: integer("trust_score").default(0),
  trustTokens: integer("trust_tokens").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
