// schema to represent a series or collection of sermons
export const sermonSeries = {
  name: 'sermonSeries',
  title: 'Sermon Series',
  type: 'document',
  fields: [ 
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean'
    },
    {
      name: 'holiday',
      title: 'Holiday',
      type: 'boolean'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string'
    },
    {
      name: 'sermons',
      title: 'Sermons in Series',
      type: 'array',
      weak: true,
      of: [
        { 
        type: 'reference',
        to: 
          {type: 'sermon'}
        }
      ],
    }
  ]
}

// schema to represent a sermon preached and recorded as an audio file
export const sermon = {
  name: 'sermon',
  title: 'Sermons',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' }
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string'
    },
    {
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: {
        accept: '.mp3'
      }
    },
    {
      name: 'series',
      title: 'Series',
      type: 'reference',
      to: [{ type: 'sermonSeries' }]
    }
  ]
}

// schema to represent an event hosted or sponsored by the church
export const event = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date'
    },
    {
      name: 'time',
      title: 'Time',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string'
    }
  ]
}

// schema to represent a page of various types of content
export const page = {
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' }
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        { type: 'file' },
      ]
    }
  ]
}