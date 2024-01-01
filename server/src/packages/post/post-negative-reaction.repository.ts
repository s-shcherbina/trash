import { AbstractRepository } from '~/libs/packages/database/database.js';

import {
  type PostNegativeReaction as TPostNegativeReaction,
  type PostNegativeReactionRepository,
  type PostNegativeReactionWithPostRelation
} from './libs/types/types.js';
import { PostNegativeReactionModel } from './post-negative-reaction-model.js';

type Constructor = Record<
  'postNegativeReactionModel',
  typeof PostNegativeReactionModel
>;

class PostNegativeReaction
  extends AbstractRepository<
    typeof PostNegativeReactionModel,
    TPostNegativeReaction
  >
  implements PostNegativeReactionRepository
{
  public constructor({ postNegativeReactionModel }: Constructor) {
    super(postNegativeReactionModel);
  }

  public async getByUserIdPostId(
    userId: number,
    postId: number
  ): Promise<PostNegativeReactionWithPostRelation | null> {
    const postNegativeReaction = await this.model
      .query()
      .select()
      .findOne({ userId, postId })
      .withGraphFetched('[post]')
      .castTo<PostNegativeReactionWithPostRelation>();

    return postNegativeReaction ?? null;
  }
}

export { PostNegativeReaction };
