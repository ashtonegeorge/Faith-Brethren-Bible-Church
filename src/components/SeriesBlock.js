import Image from "next/image";

export default function SeriesBlock({ series }) {
  // convert date to mm/dd/yyyy format
  const date = new Date(series.date).toISOString().slice(0, 10);
  let dateParts = date.split('-');
  const newDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
  const length = series.sermons.length; // number of sermons in series for button text

  return (
    <div className="flex flex-col justify-between my-2 md:p-4 p-2 w-full h-min hover:bg-blue-100 rounded-lg transition aspect-video">
      <div className="block w-full">
        <h1 className="font-bold text-slate-600 lg:text-3xl text-xl text-center pb-2">{series.name}</h1>
        <p className="md:text-lg text-md">{series.description}</p>
        <p className="md:text-md text-sm">{newDate}</p>
      </div>
      <div className="flex align-middle justify-center text-lg pb-2">
          <p className="bg-slate-500 text-slate-50 p-2 rounded-md hover:bg-slate-600 hover:text-white transition duration-300">
            {length > 1 ? `Browse ${length} sermons` : `Browse ${length} sermon`}
          </p>
      </div>
    </div>
  )
}