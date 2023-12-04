import { type SchemaTypeDefinition } from 'sanity';

import collection from './schema/collection';
import comment from './schema/comment';
import music from './schema/music';
import reply from './schema/reply';
import user from './schema/user';
import video from './schema/video';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, video, music, collection, comment, reply],
};
