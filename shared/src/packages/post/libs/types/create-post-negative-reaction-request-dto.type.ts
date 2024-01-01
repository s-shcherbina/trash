import { type PostNegativeReaction } from './post-negative-reaction.type.js';

type CreatePostNegativeReactionRequestDto = Pick<PostNegativeReaction, 'postId' | 'isDislike'>;

export { type CreatePostNegativeReactionRequestDto };
