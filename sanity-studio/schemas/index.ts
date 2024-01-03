import {type SchemaTypeDefinition} from 'sanity'
import user from './user'
import video from './video'
import music from './music'
import collection from './collection'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [user, video, music, collection],
}
