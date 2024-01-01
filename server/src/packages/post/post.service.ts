import {
  type CreatePostReactionRequestDto,
  type CreatePostReactionResponseDto,
  type CreatePostRequestDto,
  type Post as TPost,
  type PostFilter,
  type PostReaction,
  type PostReactionRepository,
  type PostRepository,
  type PostService,
  type PostWithCommentImageUserNestedRelationsWithCount,
  type PostWithImageUserNestedRelationsWithCount,
  type PostNegativeReactionRepository,
  type CreatePostNegativeReactionRequestDto,
  type CreatePostNegativeReactionResponseDto,
  type PostNegativeReaction
} from './libs/types/types.js';

type Constructor = {
  postRepository: PostRepository;
  postReactionRepository: PostReactionRepository;
  postNegativeReactionRepository: PostNegativeReactionRepository;
};

class Post implements PostService {
  #postRepository: PostRepository;

  #postReactionRepository: PostReactionRepository;

  #postNegativeReactionRepository: PostNegativeReactionRepository;

  public constructor({
    postRepository,
    postReactionRepository,
    postNegativeReactionRepository
  }: Constructor) {
    this.#postRepository = postRepository;
    this.#postReactionRepository = postReactionRepository;
    this.#postNegativeReactionRepository = postNegativeReactionRepository;
  }

  public getByFilter(
    filter: PostFilter
  ): Promise<PostWithImageUserNestedRelationsWithCount[]> {
    return this.#postRepository.getByFilter(filter);
  }

  public getById(
    id: number
  ): Promise<PostWithCommentImageUserNestedRelationsWithCount | null> {
    return this.#postRepository.getById(id);
  }

  public create(userId: number, post: CreatePostRequestDto): Promise<TPost> {
    return this.#postRepository.create({
      ...post,
      userId
    });
  }

  public async setReaction(
    userId: number,
    { postId, isLike = true }: CreatePostReactionRequestDto
  ): Promise<CreatePostReactionResponseDto> {
    // define the callback for future use as a promise
    const updateOrDelete = (
      react: PostReaction
    ): Promise<PostReaction | number> => {
      return react.isLike === isLike
        ? this.#postReactionRepository.deleteById(react.id)
        : this.#postReactionRepository.updateById(react.id, { isLike });
    };

    const reaction = await this.#postReactionRepository.getByUserIdPostId(
      userId,
      postId
    );

    const result = reaction
      ? await updateOrDelete(reaction)
      : await this.#postReactionRepository.create({ userId, postId, isLike });

    // the result is an integer when an entity is deleted
    const resultReaction = await this.#postReactionRepository.getByUserIdPostId(
      userId,
      postId
    );

    return Number.isInteger(result)
      ? {}
      : (resultReaction as NonNullable<typeof resultReaction>);
  }

  public async setNegativeReaction(
    userId: number,
    { postId, isDislike = false }: CreatePostNegativeReactionRequestDto
  ): Promise<CreatePostNegativeReactionResponseDto> {
    // define the callback for future use as a promise
    const updateOrDelete = (
      react: PostNegativeReaction
    ): Promise<PostNegativeReaction | number> => {
      return react.isDislike === isDislike
        ? this.#postNegativeReactionRepository.deleteById(react.id)
        : this.#postNegativeReactionRepository.updateById(react.id, {
            isDislike
          });
    };

    const reaction =
      await this.#postNegativeReactionRepository.getByUserIdPostId(
        userId,
        postId
      );

    const result = reaction
      ? await updateOrDelete(reaction)
      : await this.#postNegativeReactionRepository.create({
          userId,
          postId,
          isDislike
        });

    // the result is an integer when an entity is deleted
    const resultReaction =
      await this.#postNegativeReactionRepository.getByUserIdPostId(
        userId,
        postId
      );

    return Number.isInteger(result)
      ? {}
      : (resultReaction as NonNullable<typeof resultReaction>);
  }
}

export { Post };
