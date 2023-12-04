import { rules } from '@/rules';

const user = {
  name: 'user',
  type: 'document',
  title: 'User',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) =>
        Rule.regex(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          {
            name: 'email',
            invert: false, // Boolean to allow any value that does NOT match pattern
          },
        ),
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'string',
      validation: (Rule: any) =>
        Rule.max(rules.BIO_MAX_CHAR).warning(
          `A comment shouldn't exceed ${rules.BIO_MAX_CHAR} characters.`,
        ),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      accept: 'image/*',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        },
      ],
    },
    {
      name: 'following',
      title: 'Following',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'user' }] }],
    },
    {
      name: 'follower',
      title: 'Followers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'user' }] }],
    },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'video' }] }],
    },
    {
      name: 'liked',
      title: 'Liked Videos',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'video' }] }],
    },
    {
      name: 'saved',
      title: 'Saved Videos',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'video' }] }],
    },
    {
      name: 'collection',
      title: 'Collections',
      type: 'array',
      of: [{ type: 'collection' }],
    },
  ],
};

export default user;
