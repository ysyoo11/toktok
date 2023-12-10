const music = {
  name: 'music',
  type: 'document',
  title: 'Music',
  fields: [
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'artist',
      title: 'Artist',
      type: 'string',
    },
    {
      name: 'file',
      title: 'File',
      type: 'file',
      accept: 'audio/mp3',
      description: 'Only mp3 files are acceptable',
    },
    {
      name: 'cover',
      title: 'Cover',
      type: 'image',
      options: {hotspot: true},
      accept: 'image/*',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        },
      ],
    },
  ],
}

export default music
