export default function EventBlock({ event }) {

  const date = new Date(event.date).toLocaleDateString();
  return (
    <div className="lg:my-2 lg:p-4 p-2 w-full text-light">
      <h1 className="font-bold text-slate-500 lg:text-2xl md:text-2xl text-lg">{event.name}</h1>
      <p className="lg:text-lg md:text-xl text-sm">{event.description}</p>
      <p className="lg:text-lg md:text-lg text-sm font-semibold">{date}</p>
    </div>
  )
}