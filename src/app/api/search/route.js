import { NextResponse } from "next/server";
import { getSermonsByDate, getSeriesByDate, getSermonsByName, getSeriesByName } from "../../../../sanity/sanity-utils";


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchType = searchParams.get('searchType');
  const searchValue = searchParams.get('searchValue');
  const searchValueType = searchParams.get('searchValueType');

  let results;
  if (searchType === 'name') {
    if (searchValueType === 'sermon') {
      results = await getSermonsByName(searchValue);
    } else if (searchValueType === 'series') {
      results = await getSeriesByName(searchValue);
    }
  } else if (searchType === 'date') {
    if (searchValueType === 'sermon') {
      results = await getSermonsByDate(searchValue);
    } else if (searchValueType === 'series') {
      results = await getSeriesByDate(searchValue);
    }
  }

  return NextResponse.json(results);

}