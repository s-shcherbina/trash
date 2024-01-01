import { type Repository } from '~/libs/packages/database/database.js';

import {
  type PostNegativeReaction,
  type PostNegativeReactionWithPostRelation
} from './types.js';

type PostNegativeReactionRepository = Pick<
  Repository<PostNegativeReaction>,
  'create' | 'updateById' | 'deleteById'
> & {
  getByUserIdPostId(
    _userId: number,
    _postId: number
  ): Promise<PostNegativeReactionWithPostRelation | null>;
};

export { type PostNegativeReactionRepository };
