"use client";
import { useState, useEffect } from 'react';
import { createClient, groq } from "next-sanity";
import Head from 'next/head';

// revaliate the data every 24 hours in case page content is updated
export const revalidate = 86400;
export const runtime = 'nodejs';

// get an object with a content member that can be mapped
async function getPageContent() {
  // create a client to authenticate my fetch request
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-12-19",
    useCdn: false,
  });

  // fetch the object
  const data = await client.fetch(
    groq`*[_type == "page" && slug.current == "about"][0]{
      _id,
      _updatedAt,
      content,
    }`
  );
  return data;
}

export default function About() {
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContent();
      setPage(data);
      setIsLoading(false);
    };

    fetchContent();
  }, []);

  return (
    <>
      <Head>
        <title>About Us | Faith Brethren Bible Church</title>
        <meta name="description" content="Learn about Faith Brethren Bible Church" />
      </Head>
      <main>
        <h1 className="font-bold text-slate-700 md:text-3xl text-xl pb-4 mb-8 border-slate-300 border-b">About Us</h1>

        <div className='md:w-1/2 mx-auto md:text-lg'>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            page.content.map((block) => (
              <div key={block._id} className="mb-8">
                {block.children[0].text ? block.children[0].text : block.children[0].image}
              </div>
            ))
          )}
        </div>
      </main>
    </>
  )
}