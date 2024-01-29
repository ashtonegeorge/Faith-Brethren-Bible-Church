"use client";
import { useState, useEffect } from "react";

function PlayButtonBlock({ duration }) {
  return (
    <div className="flex align-center bg-slate-500 text-slate-50 p-2 rounded-md hover:bg-slate-600 hover:text-white transition duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24" className="fill-slate-50">
        <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/>
      </svg>
      <p className="md:text-lg text-md px-1">{duration}m</p>
    </div>
  )
}

export default function SermonBlock({ sermon }) {
  const [duration, setDuration] = useState(null);

  // convert date to mm/dd/yyyy format
  const date = new Date(sermon.date).toISOString().slice(0, 10);
  let dateParts = date.split('-');
  const newDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;

  // get duration of audio file
  useEffect(() => {
    const audio = new Audio(sermon.audioFile.asset.url);

    audio.onloadedmetadata = () => {
      const minutes = Math.floor(audio.duration / 60);
      setDuration(minutes);
    }
  }, [sermon.audioFile.asset.url]);
  
  return (
    <div className="flex flex-col justify-between my-2 md:p-4 p-2 w-full h-min hover:bg-blue-100 rounded-lg transition aspect-video">
      <div>
        <h1 className="font-bold text-slate-600 lg:text-3xl text-xl text-center pb-2 ">{sermon.name}</h1>
        <p className="md:text-lg text-md">{sermon.description}</p>
        <p className="md:text-md text-sm">{newDate}</p>
      </div>
      <div className="flex align-middle justify-center pb-2">
        <div className="w-min">
          <PlayButtonBlock duration={duration} />
        </div>
      </div>
    </div>
  )
}
