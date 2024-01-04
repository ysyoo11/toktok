import {Rule} from 'sanity'

const collection = {
  name: 'collection',
  type: 'document',
  title: 'Collection',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      name: 'isPrivate',
      title: 'Is Private',
      type: 'boolean',
    },
    {
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'video'}]}],
      validation: (rule: Rule) => rule.unique(),
    },
  ],
}

export default collection
