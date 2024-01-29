import Link from "next/link";
import Head from "next/head";
import { getSeriesFromSlug } from "../../../../../../sanity/sanity-utils";
import { SermonBlock } from "@/components";

export default async function SeriesPage({ params }) {
  const series = await getSeriesFromSlug(params.slug);
  return (
    <>
      <Head>
        <title>{series.name} | Series | Faith Brethren Bible Church</title>
        <meta name="description" content={series.description} />
      </Head>
      <main className="">
        <h1 className="font-bold md:text-3xl text-xl text-slate-700 md:pb-4 pb-2 border-slate-300 border-b">{series.name}</h1>
        <ul className="grid md:grid-cols-3 grid-cols-1 w-full">
          {series.sermons.map((sermon) => (
            <Link className="mt-2" href={`/watch/sermon/${sermon.slug}`} key={sermon._id}>
              <SermonBlock sermon={sermon} />
            </Link>
          ))}
        </ul>
      </main>
    </>
  )
}