import { ApiPath } from '~/libs/enums/enums.js';

import { Post as PostController } from './post.controller.js';
import { PostModel } from './post.model.js';
import { Post as PostRepository } from './post.repository.js';
import { Post as PostService } from './post.service.js';
import { PostReactionModel } from './post-reaction.model.js';
import { PostReaction as PostReactionRepository } from './post-reaction.repository.js';
import { PostNegativeReaction as PostNegativeReactionRepository } from './post-negative-reaction.repository.js';
import { PostNegativeReactionModel } from './post-negative-reaction-model.js';

const postRepository = new PostRepository({
  postModel: PostModel
});
const postReactionRepository = new PostReactionRepository({
  postReactionModel: PostReactionModel
});
const postNegativeReactionRepository = new PostNegativeReactionRepository({
  postNegativeReactionModel: PostNegativeReactionModel
});
const postService = new PostService({
  postRepository,
  postReactionRepository,
  postNegativeReactionRepository
});
const postController = new PostController({
  apiPath: ApiPath.POSTS,
  postService
});

export {
  postController,
  postNegativeReactionRepository,
  postReactionRepository,
  postRepository,
  postService
};
export {
  FilterUserMode,
  PostPayloadKey,
  PostsApiPath
} from './libs/enums/enums.js';
export {
  type CreatePostRequestDto,
  type Post,
  type PostController,
  type PostNegativeReactionRepository,
  type PostReactionRepository,
  type PostRepository,
  type PostService,
  type PostWithCommentImageUserNestedRelationsWithCount
} from './libs/types/types.js';
export { PostModel } from './post.model.js';
export { PostReactionModel } from './post-reaction.model.js';
