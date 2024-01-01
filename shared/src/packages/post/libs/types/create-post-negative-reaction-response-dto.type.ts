import { type PostNegativeReactionWithPostRelation } from './post-negative-reaction-with-post-relation.type.js';

type CreatePostNegativeReactionResponseDto =
  | Record<string, never>
  | PostNegativeReactionWithPostRelation;

export { type CreatePostNegativeReactionResponseDto };