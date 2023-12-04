const video = {
  name: 'video',
  type: 'document',
  title: 'Video',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'user' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
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
