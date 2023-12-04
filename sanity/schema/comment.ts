import { rules } from '@/rules';

const comment = {
  name: 'comment',
  type: 'document',
  title: 'Comment',
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
    {
      name: 'reply',
      title: 'Replies',
      type: 'array',
      of: [{ type: 'reply' }],
    },
  ],
};

export default comment;
