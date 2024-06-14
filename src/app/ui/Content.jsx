import Link from "next/link";
import { getAllData } from "../lib/data";

export default function Content() {
  const allData = getAllData();
  const dataElements = allData.map(e => {
    return (
      <Link 
        href={`/articles/${e.path}`} 
        key={e.path} 
        className="flex flex-col justify-center items-center
          p-4 my-4 mx-auto w-full h-full border shadow"
      >
        <h2 className="text-center my-0">{e.title}</h2>
        <time className="text-sm my-2">{e.date}</time>
        <p className="my-2">{e.intro}</p>
        <div className="text-sm mt-2 py-2 px-4 border shadow rounded-lg">
          Read more
        </div>
      </Link>
    )
  });
  
  return (
    <main className="main-content pb-4 flex flex-col">
      {dataElements}
    </main>
  )
}