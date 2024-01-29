"use client";
import { Suspense } from "react";
import { Loading, SearchResults } from "@/components"
import { useState, useEffect } from "react";
import Head from "next/head";

// revalidate data every 5 minutes in case content is updated
export const revalidate = 300;
export const runtime = 'nodejs';

export default function SearchPage() {
  // state for search form
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchValueType, setSearchValueType] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  // state for search results
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState(0); // used to force re-render of search results

  useEffect(() => {
    // fetch search results from api
    const getSearchResults = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/search?searchType=${searchType}&searchValue=${searchValue}&searchValueType=${searchValueType}`);
      const results = await response.json();
      setResults(results);
      setHasSearched(true);
      setIsLoading(false);
    }
    
    if (searchValue) {
      getSearchResults();
    }
  }, [searchType, searchValue, searchValueType, searchKey]);
  
  const handleSubmit = (event) => {
    setShowWarning(false);
    setResults([]);
    event.preventDefault();
    setSearchKey(searchKey + 1);
    const formData = new FormData(event.target);

    // if data is missing, show warning
    if ((!formData.get('searchName') && !formData.get('searchDate')) || (!formData.get('searchNameType') && !formData.get('searchDateType'))) {
      setShowWarning(true);
      return;
    }

    // determine if search is by name or date
    const isNameSearch = formData.get('searchName') ? true : false;
    
    // init variables for search query
    let searchType;
    let searchValue;
    let searchValueType;
  
    // set variables based on search type
    if (isNameSearch) {
      searchType = 'name';
      searchValue = formData.get('searchName');
      searchValueType = formData.get('searchNameType');
    } else if (!isNameSearch) {
      searchType = 'date';
      searchValue = formData.get('searchDate');
      searchValueType = formData.get('searchDateType');
    } else {
      setShowWarning(true);
      return;
    }
  
    // set state
    setSearchType(searchType);
    setSearchValue(searchValue);
    setSearchValueType(searchValueType);
    
    event.target.reset();
  }

  return (
    <>
      <Head>
        <title>Search | Faith Brethren Bible Church</title>
        <meta name="description" content="Search for sermons or series by name or date." />
      </Head>
      <main>
        <div className="w-full md:mx-auto pb-4 mb-4 border-slate-300 border-b">
          <h1 className="font-bold md:text-3xl text-xl text-slate-700 md:pb-4 pb-2 mb-4 border-slate-300 border-b">Search For Sermons or Series</h1>
          <form onSubmit={handleSubmit} className="md:flex md:flex-col grid grid-cols-1 md:gap-4">
            <div className="md:flex md:items-center md:gap-4 grid grid-flow-row">
              <div className="md:py-0 py-2">
                <h1 htmlFor="searchByName" className="font-bold md:text-xl text-lg">Search by name:</h1>
              </div>
              <input type="text" placeholder="name" id="searchName" name="searchName" className="border-slate-300 border-2 rounded-lg p-2 md:w-3/5 w-full"/>
              <div className="flex md:w-auto w-full justify-evenly md:py-0 py-2 gap-2">
                <div>
                  <input type="radio" id="nameSermon" name="searchNameType" value="sermon"/>
                  <label className="pl-1" htmlFor="nameSermon">Sermons</label>
                </div>
                <div>
                  <input type="radio" id="nameSeries" name="searchNameType" value="series"/>
                  <label className="pl-1" htmlFor="nameSeries">Series</label>
                </div>
              </div>
            </div>
            <div className="md:flex md:items-center md:gap-4 grid grid-flow-row">
              <div className="md:py-0 py-2">
                <h1 htmlFor="searchByDate" className="font-bold md:text-xl text-lg">Search by date:</h1>
              </div>
              <input type="date" id="searchDate" name="searchDate" className="border-slate-300 border-2 rounded-lg p-2"/>
              <div className="flex md:w-auto w-full justify-evenly md:py-0 py-2 gap-2">
                <div>
                  <input type="radio" id="dateSermon" name="searchDateType" value="sermon"/>
                  <label htmlFor="dateSermon" className="pl-1">Sermons</label>
                </div>
                <div>
                  <input type="radio" id="dateSeries" name="searchDateType" value="series"/>
                  <label htmlFor="dateSeries" className="pl-1">Series</label>
                </div>
              </div>
            </div>
            <p className={`${showWarning ? 'text-red-500 visible md:text-md text-sm' : 'hidden'}`}>One or more fields were missing, please try again.</p>
            <button type="submit" className="bg-slate-700 text-slate-100 rounded-lg p-2">Search</button>
        </form>
        </div>
        <div>
          <Suspense fallback={<Loading />}>
            {!isLoading && hasSearched && results.length === 0 && 
              <div className="flex items-center justify-center">
                <p className="text-center">No results found.</p>
              </div> }
            <SearchResults results={results} type={searchValueType} key={searchKey} />
          </Suspense>
        </div>
      </main>
    </>
    )
}