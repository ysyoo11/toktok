import {Rule} from 'sanity'
import {rules} from '../rules'

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
      name: 'username',
      title: 'User name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule: Rule) =>
        rule.regex(
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
      validation: (rule: Rule) =>
        rule
          .max(rules.BIO_MAX_CHAR)
          .warning(`A comment shouldn't exceed ${rules.BIO_MAX_CHAR} characters.`),
    },
    // {
    //   name: 'image',
    //   title: 'Image',
    //   type: 'image',
    //   options: {hotspot: true},
    //   accept: 'image/*',
    //   fields: [
    //     {
    //       name: 'alt',
    //       title: 'Alt',
    //       type: 'string',
    //     },
    //   ],
    // },
    {
      name: 'imageUrl',
      title: 'Image URL',
      type: 'url',
    },
    {
      name: 'following',
      title: 'Following',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'user'}]}],
      validation: (rule: Rule) => rule.unique(),
    },
    {
      name: 'followers',
      title: 'Followers',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'user'}]}],
      validation: (rule: Rule) => rule.unique(),
    },
    {
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'video'}]}],
      validation: (rule: Rule) => rule.unique(),
    },
    {
      name: 'liked',
      title: 'Liked Videos',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'video'}]}],
      validation: (rule: Rule) => rule.unique(),
    },
    {
      name: 'saved',
      title: 'Saved Videos',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'video'}]}],
      validation: (rule: Rule) => rule.unique(),
    },
    {
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'collection'}]}],
      validation: (rule: Rule) => rule.unique(),
    },
  ],
}

export default user
