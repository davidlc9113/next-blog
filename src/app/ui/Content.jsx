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
          p-4 my-4 mx-auto border shadow"
      >
        <h2>{e.title}</h2>
        <p className=" text-sm mb-2">{e.date}</p>
        <p>{e.intro}</p>
      </Link>
    )
  });
  
  return (
    <div className="main-content pb-4 flex flex-col">
      {dataElements}
    </div>
  )
}