import {Rule} from 'sanity'
import {rules} from '../rules'

const video = {
  name: 'video',
  type: 'document',
  title: 'Video',
  fields: [
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      validation: (rule: Rule) =>
        rule
          .max(rules.CAPTION_MAX_CHAR)
          .warning(`A comment shouldn't exceed ${rules.CAPTION_MAX_CHAR} characters.`),
    },
    {
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      initialValue: {title: 'Public', value: 'public'},
      options: {
        list: [
          {title: 'Public', value: 'public'},
          {title: 'Friends only', value: 'friends'},
          {title: 'Private', value: 'private'},
        ],
      },
    },
    {
      name: 'music',
      title: 'Music',
      type: 'reference',
      to: [{type: 'music'}],
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          name: 'comment',
          title: 'Comment',
          type: 'document',
          fields: [
            {
              name: 'author',
              title: 'Author',
              type: 'reference',
              to: [{type: 'user'}],
            },
            {
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (rule: Rule) =>
                rule
                  .max(rules.COMMENT_MAX_CHAR)
                  .warning(`A comment shouldn't exceed ${rules.COMMENT_MAX_CHAR} characters.`),
            },
            {
              name: 'likes',
              title: 'Likes',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'user'}]}],
            },
            {
              name: 'replies',
              title: 'Replies',
              type: 'array',
              of: [
                {
                  name: 'reply',
                  title: 'Reply',
                  type: 'document',
                  fields: [
                    {
                      name: 'author',
                      title: 'Author',
                      type: 'reference',
                      to: [{type: 'user'}],
                    },
                    {
                      name: 'text',
                      title: 'Text',
                      type: 'string',
                      validation: (rule: Rule) =>
                        rule
                          .max(rules.COMMENT_MAX_CHAR)
                          .warning(
                            `A comment shouldn't exceed ${rules.COMMENT_MAX_CHAR} characters.`,
                          ),
                    },
                    {
                      name: 'likes',
                      title: 'Likes',
                      type: 'array',
                      of: [{type: 'reference', to: [{type: 'user'}]}],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'view',
      title: 'Views',
      type: 'number',
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'user'}]}],
      validation: (rule: Rule) => rule.unique(),
    },
    {
      name: 'tag',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
}

export default video
