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
      to: [{ type: 'user' }],
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      initialValue: { title: 'Public', value: 'public' },
      options: {
        list: [
          { title: 'Public', value: 'public' },
          { title: 'Friends only', value: 'friends' },
          { title: 'Private', value: 'private' },
        ],
      },
    },
    {
      name: 'music',
      title: 'Music',
      type: 'reference',
      to: [{ type: 'music' }],
    },
    {
      name: 'comment',
      title: 'Comments',
      type: 'array',
      of: [{ type: 'comment' }],
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
      of: [{ type: 'user' }],
    },
    {
      name: 'tag',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};

export default video;
