import { PrayerRequestForm } from "@/components/PrayerRequestForm";
import Head from "next/head";

export const revalidate = 86400;
export const runtime = 'nodejs';

export default async function Connect() {
  
  return (
    <>
      <Head>
        <title>Connect | Faith Brethren Bible Church</title>
        <meta name="description" content="Connect with Faith Brethren Bible Church." />
      </Head>
      <main className="pb-8">
        <h1 className="font-bold md:text-3xl md:max-w-screen-2xl text-xl text-slate-700 md:pb-4 pb-2 border-slate-300 border-b">Connect</h1>
        <p className='text-lg text-center py-8'>We would love to meet and fellowship with you! Please visit the address below during one of the listed service times.</p>
        <div className='w-full md:flex md:justify-center grid grid-cols-1 md:gap-0 gap-8 lg:px-12'>
          <div className='md:flex md:w-full md:justify-evenly grid grid-cols-1 md:gap-0 gap-8'>
            <div className="md:my-auto lg:px-8">
              <h3 className="font-bold text-center xl:text-xl text-sm">Service Times</h3>
              <p className="font-bold text-center xl:text-lg text-sm">Sunday School: 9:30 AM</p>
              <p className="font-bold text-center xl:text-lg text-sm">Sunday Worship: 10:30 AM</p>
              <p className="font-bold text-center xl:text-lg text-sm">Sunday Evening: 7:00 PM</p>
              <p className="font-bold text-center xl:text-lg text-sm">Wednesday Evening: 7:00 PM</p> 
            </div>
            <div className="lg:px-4 md:my-auto ">
              <h3 className="font-bold text-center lg:text-xl text-sm">Contact Us</h3>
              <p className="font-bold text-center lg:text-xl text-sm">Phone: (814) 733-4336</p>
              <p className="font-bold text-center lg:text-xl text-sm">Address: 120 Chestnut Ridge Rd , New Paris PA</p>
            </div>
          </div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2471.244017547806!2d-78.63990820501343!3d40.0749494225459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1703999604775!5m2!1sen!2sus" className='border border-slate-300 w-full md:w-1/3 aspect-square' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <h1 className="font-bold md:text-3xl text-lg text-slate-700 md:py-4 md:mb-8 pt-12 pb-4 mb-8 border-slate-300 border-b">Send us an anonymous prayer request</h1>
        <div className='block'>
          <PrayerRequestForm />
        </div>

      </main>
    </>
  )
}
