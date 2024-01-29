import { Suspense } from "react";
import Link from "next/link";
import Head from "next/head";
import { Loading, SermonBlock } from "@/components";
import { getSermonFromSlug, getSeriesFromSermon } from "../../../../../../sanity/sanity-utils";

// get similar sermons by querying from parent series
async function SimilarSermons({ series }) {
  if (!series) {
    return (
      <div className="w-full">
        <p className="text-center">No results found.</p>
      </div>
    );
  } else if (series.sermons.length === 0) {
    return (
      <div className="w-full">
        <p className="text-center">No results found.</p>
      </div>
    )
  } else if (series.sermons.length > 0) {
    return (
      <ol className='grid md:grid-cols-3 grid-cols-1 gap-8'>
        {series.sermons.map((sermon) => (
          <li className="" key={sermon._id}>
            <Link href={`/watch/sermon/${sermon.slug}`}>
              <SermonBlock sermon={sermon} />
            </Link>
          </li>
        ))}
      </ol>
    )
  }
}

export default async function SermonPage({ params }) {
  // get sermon/series data using params from sanity
  const sermon = await getSermonFromSlug(params.slug);
  const parentSeries = await getSeriesFromSermon(sermon._id)
  const otherSermons = parentSeries.sermons.filter((s) => s._id !== sermon._id);
  parentSeries.sermons = otherSermons;

  return (
    <>
      <Head>
        <title>{sermon.name} | Sermons | Faith Brethren Bible Church</title>
        <meta name="description" content={sermon.description} />
      </Head>
      <div>
        <h1 className="font-bold text-slate-700 md:text-3xl text-xl pb-4 mb-8 border-slate-300 border-b">{sermon.name}</h1>
        <div className="grid grid-cols-1 md:pb-8 pb-4 place-items-center ">
          <audio controls src={sermon.audioFile.asset.url} className="md:w-3/4 w-full">
            Your browser does not support the
            <code>audio</code> element.
          </audio>
          <p className="md:text-xl text-md font-medium pt-2">{sermon.description}</p>
        </div>

        <h1 className="font-bold text-slate-700 md:text-3xl text-xl pb-4 md:mb-8 mt-12 md:mt-0 border-slate-300 border-b">More like this</h1>
        <Suspense fallback={<Loading />}>
          <SimilarSermons series={parentSeries} />
        </Suspense>

      </div>
    </>
  )
}