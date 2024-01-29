import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-700 px-8 py-4 pb-8">
      <div className="xl:w-1/2 xl:mx-auto">
        <h2 className="text-slate-100 font-bold text-center md:text-2xl pb-4 border-b border-slate-300">Faith Brethren Bible Church</h2>
        <div className="flex justify-evenly py-8 border-b border-slate-300">
          <Link href="/" className="text-slate-300 hover:text-slate-50 px-4 font-semibold md:text-2xl">
            Home
          </Link>
          <Link href="/watch" className="text-slate-300 hover:text-slate-50 px-4 font-semibold md:text-2xl">
            Watch
          </Link>
          <Link href="/connect" className="text-slate-300 hover:text-slate-50 px-4 font-semibold md:text-2xl">
            Connect
          </Link>
          <Link href="/search" className="text-slate-300 hover:text-slate-50 px-4 font-semibold md:text-2xl">
            Search
          </Link>
        </div>
        <div className="md:flex block md:justify-evenly md:items-center pt-4">
          <div className="md:border-r pb-8 md:pb-0 px-8 md:w-1/2">
            <h3 className="text-slate-100 font-bold text-center md:text-xl">Service Times</h3>
            <p className="text-slate-100 font-bold text-center md:text-lg">Sunday School: 9:30 AM</p>
            <p className="text-slate-100 font-bold text-center md:text-lg">Sunday Worship: 10:30 AM</p>
            <p className="text-slate-100 font-bold text-center md:text-lg">Sunday Evening: 6:00 PM</p>
            <p className="text-slate-100 font-bold text-center md:text-lg">Wednesday Evening: 7:00 PM</p> 
          </div>
          <div className="px-8 md:w-1/2">
            <h3 className="text-slate-100 font-bold text-center md:text-xl">Contact Us</h3>
            <p className="text-slate-100 font-bold text-center md:text-lg">Phone: (814) 733-4336</p>
            <p className="text-slate-100 font-bold text-center md:text-lg">Address: 120 Chestnut Ridge Rd , Schellsburg PA</p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-slate-100 text-center pt-8">© 2024 Faith Brethren Bible Church</p>
        <p className="text-slate-100 text-center underline">Website by <a href="https://www.ashtonegeorge.com" className="text-slate-100 hover:text-slate-50">Ashton George</a></p>        
      </div>
    </footer>
  );
}