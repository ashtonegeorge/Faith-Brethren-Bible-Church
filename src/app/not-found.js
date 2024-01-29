import { Footer, Navbar } from '@/components'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className=''>
      <Navbar />
      <div className='min-h-[75vh] flex justify-center text-center items-center'>
        <div className='block'>
          <h2 className='my-8 text-6xl text-slate-700 font-semibold'>Page Not Found</h2>
          <p className='my-8 text-xl font-light'>Could not find requested resource</p>
          <Link href="/" className='cursor-pointer my-8 text-slate-700 bg-slate-300 hover:text-slate-100 hover:bg-slate-500 transition px-4 py-2 font-semibold text-lg'>Return Home</Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}