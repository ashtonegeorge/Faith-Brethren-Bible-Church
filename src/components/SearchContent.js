"use client";
import Link from "next/link";
import SermonBlock from "./SermonBlock";
import SeriesBlock from "./SeriesBlock";

export default function SearchResults({results, type}) {
  // display content based on object type
  if (type === "sermon") {
    return (
      <div className="grid md:grid-cols-3 grid-rows-1 grid-flow-row">
        {results.map(result => (
          <Link href={`/watch/sermon/${result.slug}`} key={result.name}>
            <SermonBlock sermon={result} />
          </Link>
        ))}
      </div>
    )
  } else if (type === "series") {
    return (
      <div className="grid md:grid-cols-3 grid-rows-1 grid-flow-row">
        {results.map(result => (
          <Link href={`/watch/series/${result.slug}`} key={result.name}>
            <SeriesBlock series={result} />
          </Link>
        ))}
      </div>
    )
  }
}