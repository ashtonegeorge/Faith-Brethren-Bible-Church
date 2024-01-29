"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { createClient, groq } from "next-sanity";
import { SeriesBlock } from "@/components";

// revalidate the data every 5 minutes in case content is updated
export const revalidate = 300;
export const runtime = 'nodejs';

async function getAllSeries(page = 1, limit = 10) {
  // create a client to authenticate my fetch request
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-12-19",
    useCdn: false,
  });

  // define start and end points for query
  const start = (page - 1) * limit;
  const end = page * limit;
  // fetch the series object
  const data = await client.fetch(
    groq`*[_type == "sermonSeries"] | order(_updatedAt desc){
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
        description,
        audioFile{
          asset->{
            _id,
            url
          }
        },
      }
    }[${start}..${end}]`
  );

  return data;
}

export default function AllSeries() {
  const [page, setPage] = useState(1);
  const [series, setSeries] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // fetch series data from sanity
  useEffect(() => {
    const fetchSeries = async () => {
      const data = await getAllSeries(page);
      // add new series to existing series
      setSeries(prevSeries => {
        const newSeries = data.filter(d => !prevSeries.some(p => p._id === d._id));
        return [...prevSeries, ...newSeries];
      });
      // if there are less than 10 results, there are no more results
      if (data.length < 10) {
        setHasMore(false);
      }
      setIsLoading(false);
    };
    fetchSeries();
  }, [page]);

  return (
    <>
      <Head>
        <title>All Series | Watch | Faith Brethren Bible Church</title>
        <meta name="description" content="Watch all of our sermon series here." />
      </Head>
      <main>
        <h1 className="font-bold md:text-3xl text-xl text-slate-700 md:pb-4 pb-2 border-slate-300 border-b">All Series</h1>
        <ol className='grid md:grid-cols-3 grid-cols-1 gap-8 items-stretch'>
          {series.map((series) => (
            <li className="" key={series._id}>
              <Link href={`/watch/series/${series.slug}`}>
                <SeriesBlock series={series} />
              </Link>
            </li>
          ))}
        </ol>
        <div className="w-full flex justify-ceznter">
          {!isLoading && hasMore && <button className='text-slate-700 bg-slate-300 hover:text-slate-100 hover:bg-slate-500 transition md:px-6 px-2 md:ml-0 ml-2 md:py-2 py-1 font-semibold md:text-lg text-md' onClick={() => setPage(prevPage => prevPage + 1)}>Show More</button>}
        </div>
      </main>
    </>
  )
}