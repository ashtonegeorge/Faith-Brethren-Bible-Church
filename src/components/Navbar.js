"use client";
import { useState } from "react";
import './Navbar.css';
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSubMenuOpen(false)
  }

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  }

  return (
    <nav className="block w-full md:max-w-screen-xl">
      {/* <!-- Desktop Main Nav --> */}
      <div className="hidden md:block fixed top-0 w-full z-50">
        <div className="sm:flex block bg-slate-100 md:max-w-screen-2xl md:mx-auto px-2 items-center md:py-3 py-2 md:justify-between --font-playfair-display">
          <div className="md:flex hidden md:items-center md:justify-evenly w-full text-center">
            <Link href="/" className="cursor-pointer">
              <h1 className="font-bold md:text-2xl text-sm pb-2 md:pb-0 text-slate-700 hover:text-slate-900">Faith Brethren Bible Church</h1>
            </Link>
          </div>
          <div className="md:hidden block md:items-center md:justify-evenly w-full text-center">
            <div>
              <h1 className="font-bold md:text-2xl text-sm pb-2 md:pb-0 text-slate-700 hover:text-slate-900">Faith Brethren Bible Church</h1>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <Link href="/" onClick={isMenuOpen ? toggleMenu : null} className="cursor-pointer text-slate-500 hover:text-slate-900 md:px-6 px-2 font-semibold md:text-lg text-md">
              <h1 className="cursor-pointer">Home</h1>
            </Link>
            <Link href="/about" onClick={isMenuOpen ? toggleMenu : null} className="cursor-pointer text-slate-500 hover:text-slate-900 md:px-6 px-2 font-semibold md:text-lg text-md">
              <h1 className="cursor-pointer">About</h1>
            </Link>
            <button onClick={toggleMenu} className="cursor-pointer text-slate-500 hover:text-slate-900 md:px-6 px-2 font-semibold md:text-lg text-md">
              Watch
            </button>
            <Link href="/connect" onClick={isMenuOpen ? toggleMenu : null} className="cursor-pointer text-slate-700 bg-slate-300 hover:text-slate-100 hover:bg-slate-500 transition md:px-6 px-2 md:ml-0 ml-2 md:py-2 py-1 font-semibold md:text-lg text-md">
              Connect
            </Link>
            <Link href="/search" onClick={isMenuOpen ? toggleMenu : null} className="cursor-pointer fill-slate-500 hover:fill-slate-700 px-6">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* <!-- Mega Menu Desktop--> */}
        <div id="mega-menu-full" className={isMenuOpen ? 'open xl:max-w-screen-2xl xl:mx-auto md:transition-transform transition-none z-0 w-full py-4 md:flex md:justify-center block gap-4 bg-slate-200 border-y-2 border-slate-300' : 'md:closed md:flex h-0 hidden collapse'}>
            <Link onClick={toggleMenu} href="/watch" className="md:p-2 rounded-lg hover:bg-blue-200 text-slate-700 hover:text-slate-900 ">
              <h1 className="font-bold md:text-2xl text-md">All Sermons</h1>
              <p className="font-light md:text-lg text-sm text-slate-500">Browse all sermons from newest to oldest.</p>
            </Link>
            <Link onClick={toggleMenu} href="/watch/all-series" className="md:p-2 p-1 rounded-lg hover:bg-blue-200 font-bold text-slate-700 hover:text-slate-900">
              <h1 className="font-bold md:text-2xl text-md">All Series</h1>
              <p className="font-light md:text-lg text-sm text-slate-500">Browse all sermon series from newest to oldest.</p>
            </Link>
        </div>
      </div>

      {/* <!-- Mobile Main Nav --> */}
      <div className="fixed top-0 w-full z-50 md:hidden">
        <div className="flex justify-between items-center bg-slate-100 p-4">
            <button onClick={toggleMenu} className="text-slate-500 hover:text-slate-900 px-2 fill-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
              </svg>
            </button>
            <Link href="/">
              <h1 className="font-bold sm:text-md text-sm md:pb-0 text-slate-700 hover:text-slate-900">Faith Brethren Bible Church</h1>
            </Link>
            <Link href="/search" className="text-slate-500 hover:text-slate-900 px-2 fill-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
              </svg>
            </Link>
        </div>
      </div>

      {/* <!-- Mega Menu Mobile--> */}
      <div id="" className={isMenuOpen ? 'md:hidden fixed top-0 w-full z-40 pt-16 pb-2 bg-slate-100' : 'hidden'}>
        <div className="grid grid-flow-row">
          <Link href="/" onClick={isMenuOpen ? toggleMenu : null} className="text-slate-600 bg-slate-200 hover:text-slate-900 mx-2 p-2 font-semibold text-lg">
            Home
          </Link>
          <Link href="/about" onClick={isMenuOpen ? toggleMenu : null} className="text-slate-600 bg-slate-200 hover:text-slate-900 mx-2 p-2 font-semibold text-lg border-t-2 border-slate-300">
            About
          </Link>
          <button onClick={toggleSubMenu} className="flex justify-between text-slate-600 bg-slate-200 mx-2 p-2 hover:text-slate-900 px-2 font-semibold text-lg text-left border-y-2 border-slate-300">
            <h2>
              Watch
            </h2>
            <div className={`${isSubMenuOpen ? 'hidden' : 'block'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/>
              </svg>
            </div>
            <div className={`${isSubMenuOpen ? 'block' : 'hidden'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z"/>
              </svg>
            </div>
          </button>
          <div className={`${isSubMenuOpen ? 'md:hidden block bg-slate-200 mx-2 p-2 border-b-2 border-slate-300' : 'hidden'}`}>
            <Link onClick={toggleMenu} href="/watch" className="md:p-2 rounded-lg text-slate-500 hover:text-slate-900 ">
              <h1 className="font-bold md:text-xl text-md">All Sermons</h1>
              <p className="font-light md:text-md text-sm text-slate-600">Browse all sermons from newest to oldest.</p>
            </Link>
            <Link onClick={toggleMenu} href="/watch/all-series" className="md:p-2 p-1 rounded-lg font-bold text-slate-500 hover:text-slate-900">
              <h1 className="font-bold md:text-xl text-md">All Series</h1>
              <p className="font-light md:text-md text-sm text-slate-600">Browse all sermon series from newest to oldest.</p>
            </Link>
          </div>
          <Link href="/connect" onClick={isMenuOpen ? toggleMenu : null} className="text-slate-600 bg-slate-200 mx-2 p-2 hover:text-slate-900 px-2 font-semibold text-lg">
            Connect
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
