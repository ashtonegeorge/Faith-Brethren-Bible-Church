import { Navbar, Footer } from '@/components';

export default function ContentLayout({ children }) {
  return (
    <section className=''>
      <Navbar />
      <div className='py-20 px-8 min-h-[75vh] md:max-w-screen-2xl 3xl:mx-auto bg-slate-100 bg-none'>
        {children}
      </div>
      <Footer />
  </section>
  )
}