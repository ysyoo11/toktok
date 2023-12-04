import { rules } from '@/rules';

const collection = {
  name: 'collection',
  type: 'document',
  title: 'Collection',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) =>
        Rule.max(rules.COLLECTION_MAX_CHAR).warning(
          `A collection shouldn't exceed ${rules.COLLECTION_MAX_CHAR} characters.`,
        ),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'user' }],
    },
    {
      name: 'isPrivate',
      title: 'Is Private',
      type: 'boolean',
    },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [{ type: 'video' }],
    },
  ],
};

export default collection;
