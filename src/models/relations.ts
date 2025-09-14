
import { relations } from "drizzle-orm";
import { users } from "./users";
import { knowledgePosts, answers } from "./knowledge";
import { communities, communityMemberships } from "./communities";
import { tags, postTags } from "./tags";

export const userRelations = relations(users, ({ many }) => ({
  knowledgePosts: many(knowledgePosts),
  answers: many(answers),
  communityMemberships: many(communityMemberships),
}));

export const knowledgePostRelations = relations(knowledgePosts, ({ one, many }) => ({
  user: one(users, {
    fields: [knowledgePosts.userId],
    references: [users.id],
  }),
  answers: many(answers),
  postTags: many(postTags),
}));

export const answerRelations = relations(answers, ({ one }) => ({
  knowledgePost: one(knowledgePosts, {
    fields: [answers.knowledgePostId],
    references: [knowledgePosts.id],
  }),
  user: one(users, {
    fields: [answers.userId],
    references: [users.id],
  }),
}));

export const communityRelations = relations(communities, ({ many }) => ({
  communityMemberships: many(communityMemberships),
}));

export const communityMembershipRelations = relations(communityMemberships, ({ one }) => ({
  user: one(users, {
    fields: [communityMemberships.userId],
    references: [users.id],
  }),
  community: one(communities, {
    fields: [communityMemberships.communityId],
    references: [communities.id],
  }),
}));

export const tagRelations = relations(tags, ({ many }) => ({
  postTags: many(postTags),
}));

export const postTagRelations = relations(postTags, ({ one }) => ({
  post: one(knowledgePosts, {
    fields: [postTags.postId],
    references: [knowledgePosts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}));
