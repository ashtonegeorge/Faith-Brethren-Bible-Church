import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { getFeaturedSermons, getEvents } from "../../sanity/sanity-utils.js";
import { Loading, Navbar, Footer, SermonBlock, EventBlock } from "@/components";
import desktopSplash from "/public/desktopsplash.png";
import mobileSplash from "/public/mobilesplash.png";
import PastorJim from "/public/pastorjim.png";
import Pulpit from "/public/pulpit.jpg";

// revalidate the data every 24 hours in case content is updated
export const revalidate = 86400;
export const runtime = 'nodejs';

// get a list of featured sermon objects and map it to a list of sermon blocks
async function FeaturedSermons() {
  const featuredSermons = await getFeaturedSermons();
  return (
    <ul className="grid md:grid-cols-3 grid-cols-1 md:grid-rows-1 grid-rows-3 justify-evenly w-full">
      {featuredSermons.map((sermon) => (
        <li className="w-full rounded-lg cursor-pointer" key={sermon._id}>
          <Link href={`/watch/sermon/${sermon.slug}`}>
            <SermonBlock sermon={sermon} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

// get a list of event objects and map it to a list of event blocks
async function Events() {
  const events = await getEvents();
  return (
    <ul className="grid grid-cols-1 md:grid-rows-3 w-full items-stretch justify-items-stretch">
      {events.map((event) => (
        <li className="w-full md:h-44" key={event._id}>
          <EventBlock event={event} />
        </li>
      ))}
    </ul>
  );
}

// note: the navbar and footer are rendered directly in this page, rather than the layout, to avoid their presence in admin console
export default async function Home() {
  return (
    <>
      <Head>
        <title>Faith Brethren Bible Church</title>
        <meta name="description" content="Faith Brethren Bible Church is a non-denominational, independent church committed to the Word of God recorded in the Bible. We are located in New Paris, PA." />
      </Head>
      {/* Navbar */}
      <Navbar />
    
      <main className="bg-slate-100 px-8 py-20 max-w-screen-2xl mx-auto w-ful h-auto">
        {/* <!-- Hero --> */}
        <div className="h-full lg:flex lg:items-start grid grid-flow-row md:grid-cols-2 grid-cols-1 gap-8 md:py-4 pt-4 pb-12">
          <div className="md:block hidden lg:w-1/3 md:w-full md:h-full">
            <h2 className="font-bold text-slate-700 md:text-3xl text-xl pb-4 mb-8 border-slate-300 border-b">Meet Pastor Jim!</h2>
            {/* Headshot of Pastor Jim */}
            <div className="h-full md:grid md:grid-cols-1 md:grid-flow-row items-start">
              <div className="h-1/3 w-5/6 mx-auto relative">
                <Image 
                  src={PastorJim}
                  alt="Headshot of Pastor Jim Espenshade"
                  quality={100}
                  priority
                  className="shadow-sm shadow-slate-500 aspect-auto rounded-sm"
                />
              </div>
              <p className="h-1/3 py-4 mx-auto">Meet our longtime pastor, Jim Espenshade! Pastor Jim has adamantly followed Jesus through his tenure of over 25 years.</p>
            </div>
          </div>
          {/* Splash Images */}
          <div className="relative lg:w-1/3 md:w-full mx-auto lg:h-1/3 md:mt-12 md:self-start md:px-4 xl:border-slate-300 xl:border-x-2 self-center">
            <Image 
              src={desktopSplash}
              alt="Exterior view of Faith Brethren Bible Church"
              width={500}
              height={500}
              quality={100}
              priority
              className="brightness-75 w-full shadow-sm shadow-slate-500 aspect-square md:block hidden rounded-sm"
            />
            <Image 
              src={mobileSplash}
              alt="Exterior view of Faith Brethren Bible Church"
              width={500}
              height={500}
              quality={100}
              priority
              className="brightness-75 shadow-sm shadow-slate-500 md:hidden block rounded-sm"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold w-5/6">
              <h1 className="2xl:text-5xl xl:text-3xl sm:text-2xl text-lg text-center">
                Welcome to <br/> Faith Brethren Bible Church!
              </h1>
              <h2 className="2xl:text-2xl xl:text-xl sm:text-xl text-md text-center">
                120 Chestnut Ridge Rd, Schellsburg PA
              </h2>
            </div>
          </div>
          <div className="md:hidden block md:w-1/3 md:h-full">
            <h2 className="font-bold text-slate-700 md:text-3xl text-xl pb-4 mb-8 border-slate-300 border-b">Meet Pastor Jim!</h2>
            {/* Headshot of Pastor Jim */}
            <div className="md:grid md:grid-cols-1 md:grid-flow-row items-start">
              <div className="h-full w-5/6 mx-auto relative">
                <Image 
                  src={PastorJim}
                  alt="Headshot of Pastor Jim Espenshade"
                  quality={100}
                  priority
                  className="shadow-sm shadow-slate-500 aspect-auto rounded-sm"
                />
              </div>
              <p className="h-1/3 py-4 mx-auto">Meet our longtime pastor, Jim Espenshade! Pastor Jim has adamantly followed Jesus through his tenure of over 25 years.</p>
            </div>
          </div>
          <div className="lg:w-1/3 w-full md:col-span-2 md:px-4 lg:pt-0 md:pt-12">
            <h2 className="font-bold text-slate-700 md:text-3xl text-xl pb-4 border-slate-300 border-b">Upcoming Events:</h2>
            <Suspense fallback={<Loading />}>
              <Events />
            </Suspense>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="pt-4 pb-16 w-full md:flex md:justify-evenly grid grid-flow-row">
          <div className="self-center">
            <h1 className="font-bold text-slate-700 md:text-3xl text-xl pb-4 mb-8 border-slate-300 border-b">Quick Facts</h1>
            <div>
              <h3 className="font-bold text-slate-600 md:text-2xl text-lg pb-2">Faith Brethren Bible Church is:</h3>
              <ul className="list-disc list-inside md:text-lg text-md pl-4 md:pb-0 pb-4">
                <li>a non-denominational, independent church</li>
                <li>committed to the Word of God recorded in the Bible</li>
                <li>located in New Paris, PA</li>
              </ul>
            </div>
          </div>
          <div>
            <Image
              src={Pulpit}
              alt="Landscape view of Pulpit within the Sanctuary"
              className="shadow-sm shadow-slate-500 aspect-auto rounded-sm"
            />
          </div>
        </div>

        {/* Featured Sermons */}
        <div className="pt-4 pb-16 w-full h-min">
          <h1 className="font-bold md:text-3xl text-xl mb-2 md:mb-0 text-slate-700 pb-4 border-slate-300 border-b">Featured Sermons</h1>
          <Suspense fallback={<Loading />}>
            <FeaturedSermons />
          </Suspense>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
