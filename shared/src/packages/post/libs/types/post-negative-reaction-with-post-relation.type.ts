import { type Post } from '~/packages/post/post.js';

import { type PostNegativeReaction } from './post-negative-reaction.type.js';

type PostNegativeReactionWithPostRelation = PostNegativeReaction & Record<'post', Post>;

export { type PostNegativeReactionWithPostRelation };