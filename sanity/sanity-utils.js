import { createClient, groq } from 'next-sanity';

/* Sermon Queries */

/**
 * Fetches all sermons from the Sanity.io production dataset.
 * 
 * @async
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of sermon objects. Each object contains the sermon's id, update time, name, date, slug, description, and audio file information.
 * @throws {Error} Throws an error if there is a problem fetching the sermons.
 */ 
export async function getSermons() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-12-19",
    useCdn: false,
  });
  
  return await client.fetch(
    groq`*[_type == "sermon"] | order(_updatedAt desc){
      _id,
      _updatedAt,
      name,
      date,
      "slug": slug.current,
      audioFile{
        asset->{
          _id,
          url
        }
      },
      description,
    }`
  )
}

/**
 * Fetches the first three sermons marked as featured from the Sanity.io production dataset.
 *
 * @async
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of sermon objects. Each object contains the sermon's id, update time, name, date, slug, description, and audio file information.
 * @throws {Error} Throws an error if there is a problem fetching the sermons.
 */
export async function getFeaturedSermons() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-12-19",
    useCdn: false,
  });

  return await client.fetch(
    groq`*[_type == 'sermon' && featured == true][0..2]{
      _id,
      _updatedAt,
      name,
      date,
      "slug": slug.current,
      description,
      audioFile{
        asset->{
          _id,
          url
        }
      },
    }`
  )
}

/**
 * Fetches a sermon from the Sanity.io production dataset with the given slug.
 * 
 * @async
 * @param {String} slug The slug of the sermon to fetch.
 * @returns {Promise<Object>} A promise that resolves with a sermon object. The object contains the sermon's id, update time, name, date, slug, description, and audio file information.
 * @throws {Error} Throws an error if there is a problem fetching the sermon.
 */
export async function getSermonFromSlug(slug) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-12-19",
    useCdn: false,
  });

  return await client.fetch(
    groq`*[_type == "sermon" && slug.current == $slug][0]{
      _id,
      _updatedAt,
      name,
      date,
      "slug": slug.current,
      audioFile{
        asset->{
          _id,
          url
        }
      },
      url,
      description,
    }`,
    { slug }
  )
}

/**
 * Fetches a sermon from the Sanity.io production dataset with the given date.
 * 
 * @async
 * @param {String} date The date of the sermon(s) to fetch.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of sermon objects. The objects contain the sermon's id, update time, name, date, slug, description, and audio file information.
 * @throws {Error} Throws an error if there is a problem fetching the sermon.
 */ 
export async function getSermonsByDate(date) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-12-19",
    useCdn: false,
  });

  return await client.fetch(
    groq`*[_type == "sermon" && date == $date] {  
      _id,
      _updatedAt,
      name,
      date,
      "slug": slug.current,
      audioFile{
        asset->{
          _id,
          url
        }
      },
      description,
    }`,
    { date }
  )
}

/**
 * Fetches a sermon from the Sanity.io production dataset with the given name.
 * 
 * @async
 * @param {String} name The name of the sermon(s) to fetch.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of sermon objects. The objects contain the sermon's id, update time, name, date, slug, description, and audio file information.
 * @throws {Error} Throws an error if there is a problem fetching the sermon.
 */ 
export async function getSermonsByName(name) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-12-19",
    useCdn: false,
  })

  return await client.fetch(
    groq`*[_type == "sermon" && name match $name] {  
      _id,
      _updatedAt,
      name,
      date,
      "slug": slug.current,
      audioFile{
        asset->{
          _id,
          url
        }
      },
      description,
    }`,
    { name: `*${name}*` }
  )
}

/* Sermon Series Queries */

/**
 * Fetches all sermon series from the Sanity.io production dataset.
 * 
 * @async
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of sermon series objects. Each object contains the sermon series' id, update time, name, date, slug, description, and sermons.
 * @throws {Error} Throws an error if there is a problem fetching the sermon series.
 */
export async function getSeries() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-12-19",
    useCdn: false,
  });

  const query = groq`*[_type == "sermonSeries"] | order(_updatedAt desc){
    _id,
    _updatedAt,
    name,
    date,
    "slug": slug.current,
    description,
    "sermons": sermons[]->{
      _id,
      name,
      "slug": slug.current,
      audioFile{
        asset->{
          _id,
          url
        }
      },
      description,
    }
  }`

  return await client.fetch(query)
}

/**
 * Fetches the first three sermon series marked as featured from the Sanity.io production dataset.
 * 
 * @async
 * @returns {Promise<Object>} A promise that resolves a sermon series object. The object contains the sermon series' id, update time, name, date, slug, description, and sermons.
 * @throws {Error} Throws an error if there is a problem fetching the sermon series.
 */ 
export async function getSeriesFromSlug(slug) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-12-19",
    useCdn: false,
  });

  return await client.fetch(
    groq`*[_type == "sermonSeries" && slug.current == $slug][0]{
      _id,
      _updatedAt,
      name,
      date,
      "slug": slug.current,
      description,
      "sermons": sermons[]->{
        _updatedAt,
        _id,
        name,
        date,
        "slug": slug.current,
        audioFile{
          asset->{
            _id,
            url
          }
        },
        description,
      }
    }`,
    { slug }
  )
}

/**
 * Fetches a sermon series from the Sanity.io production dataset with the given slug.
 * 
 * @async
 * @param {String} id The id of the sermon reference to the sermon series to fetch 
 * @returns {Promise<Object>} A promise that resolves a sermon series object. The object contains the sermon series' id, update time, name, date, slug, description, and sermons.
 * @throws {Error} Throws an error if there is a problem fetching the sermon series.
 */ 
export async function getSeriesFromSermon(id) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-12-19",
    useCdn: false,
  });

  const result = await client.fetch(
    groq`*[_type == "sermonSeries" && references($id)][0]{
      _id,
      _updatedAt,
      name,
      date,
      "slug": slug.current,
      description,
      "sermons": sermons[]->{
        _id,
        _updatedAt,
        name,
        date,
        "slug": slug.current,
        audioFile{
          asset->{
            _id,
            url
          }
        },
        description,
      }
    }`,
    { id }
  )
  return result;
}

/**
 * Fetches a sermon series from the Sanity.io production dataset with the given date.
 * 
 * @async
 * @param {String} date The date of the sermon series to fetch.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of sermon series objects. The objects contain the sermon series' id, update time, name, date, slug, description, and sermons.
 * @throws {Error} Throws an error if there is a problem fetching the sermon series.
 */
export async function getSeriesByDate(date) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-12-19",
    useCdn: false,
  });
  
  return await client.fetch(
    groq`*[_type == "sermonSeries" && date == $date][0..2] | order(_updatedAt desc){
      _id,
      _updatedAt,
      name,
      date,
      "slug": slug.current,
      description,
      "sermons": sermons[]->{
        _id,
        name,
        date,
        "slug": slug.current,
        audioFile{
          asset->{
            _id,
            url
          }
        },
        description,
      }
    }`,
    { date }
  )
}

/**
 * Fetches a sermon series from the Sanity.io production dataset with the given name.
 * 
 * @async
 * @param {String} name The name of the sermon series to fetch.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of sermon series objects. The objects contain the sermon series' id, update time, name, date, slug, description, and sermons.
 * @throws {Error} Throws an error if there is a problem fetching the sermon series.
 */
export async function getSeriesByName(name) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-12-19",
    useCdn: false,
  })

  return await client.fetch(
    groq`*[_type == "sermonSeries" && name match $name] {  
      _id,
      _updatedAt,
      name,
      date,
      "slug": slug.current,
      description,
      "sermons": sermons[]->{
        _id,
        name,
        date,
        "slug": slug.current,
        audioFile{
          asset->{
            _id,
            url
          }
        },
        description,
      }
    }`,
    { name: `*${name}*` }
  )
}

/* Event Queries */

/**
 * Fetches all events from the Sanity.io production dataset.
 * 
 * @async
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of event objects. Each object contains the event's id, update time, name, date, and description.
 * @throws {Error} Throws an error if there is a problem fetching the events.
 */
export async function getEvents() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2021-03-25",
    useCdn: false,
  });
  
  return await client.fetch(
    groq`*[_type == "event"][0..2] | order(_updatedAt desc){
      _id,
      _updatedAt,
      name,
      date,
      date,
      description,
    }`
  )
}