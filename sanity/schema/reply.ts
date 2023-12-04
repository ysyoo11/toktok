import { rules } from '@/rules';

const reply = {
  name: 'reply',
  type: 'document',
  title: 'Reply',
  fields: [
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'user' }],
    },
    {
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule: any) =>
        Rule.max(rules.COMMENT_MAX_CHAR).warning(
          `A comment shouldn't exceed ${rules.COMMENT_MAX_CHAR} characters.`,
        ),
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [{ type: 'user' }],
    },
  ],
};

export default reply;
