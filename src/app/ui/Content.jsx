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
        <p className="text-sm my-2">{e.date}</p>
        <p className="my-2">{e.intro}</p>
        <div className="text-sm my-0 py-2 px-4 border shadow rounded-lg">
          Read more
        </div>
      </Link>
    )
  });
  
  return (
    <div className="main-content pb-4 flex flex-col">
      {dataElements}
    </div>
  )
}