"use client";
import { useState, useEffect } from 'react';
import { createClient, groq } from 'next-sanity';
import Link from 'next/link';
import Head from 'next/head';
import { SermonBlock } from '@/components';

// revalidate the data every 5 minutes in case content is updated
export const revalidate = 300;
export const runtime = 'nodejs';

// get a list of all sermon objects and map it to a list of sermon blocks
async function getAllSermons(page = 1, limit = 10) {
  // create a client to query data from Sanity
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-12-19",
    useCdn: false,
  });

  // define start and end points for query
  const start = (page - 1) * limit;
  const end = page * limit;
  // fetch the sermon objects
  const data = await client.fetch(
    groq`*[_type == "sermon"] | order(_updatedAt desc){
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
      }
    }[${start}..${end}]`
  );

  return data;
}

export default function AllSermons() {
  const [page, setPage] = useState(1);
  const [sermons, setSermons] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch sermon data from sanity
    const fetchSermons = async () => {
      const data = await getAllSermons(page);
      // add new sermons to the list of sermons
      setSermons(prevSermons => {
        const newSermons = data.filter(d => !prevSermons.some(p => p._id === d._id));
        return [...prevSermons, ...newSermons];
      });
      // if there are less than 10 sermons, there are no more sermons to fetch
      if (data.length < 10) {
        setHasMore(false);
      }
      setIsLoading(false);
    };

    fetchSermons();
  }, [page]);

  return (
    <>
      <Head>
        <title>All Sermons | Watch | Faith Brethren Bible Church</title>
        <meta name="description" content="Watch all sermons preached at Faith Brethren Bible Church." />
      </Head>
      <main>
        <h1 className="font-bold md:text-3xl text-xl text-slate-700 md:pb-4 pb-2 border-slate-300 border-b">All Sermons</h1>
        <ol className='grid md:grid-cols-3 grid-cols-1 gap-8'>
          {sermons.map((sermon) => (
            <li className="" key={sermon._id}>
              <Link href={`/watch/sermon/${sermon.slug}`}>
                <SermonBlock sermon={sermon} />
              </Link>
            </li>
          ))}
        </ol>
        <div className='w-full flex justify-center'>
          {!isLoading && hasMore && <button className='text-slate-700 bg-slate-300 hover:text-slate-100 hover:bg-slate-500 transition md:px-6 px-2 md:ml-0 ml-2 md:py-2 py-1 font-semibold md:text-lg text-md' onClick={() => setPage(prevPage => prevPage + 1)}>Show More</button>}
        </div>
      </main>
    </>
  )
}