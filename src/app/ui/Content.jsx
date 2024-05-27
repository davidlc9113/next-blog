import Link from "next/link";
import { getAllData } from "../lib/data";

export default function Content() {
  const allData = getAllData();
  const dataElements = allData.map(e => {
    return (
      <Link 
        href={`/articles/${e.file}`} 
        key={e.file} 
        className="flex flex-col justify-center items-center
          p-4 my-4 mx-auto border md:w-1/2 shadow"
      >
        <h3 className=" text-3xl mb-2">{e.file}</h3>
        <p className=" text-sm">{e.date}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Suspendisse sed nisi lacus sed viverra tellus.</p>
      </Link>
    )
  });
  
  return (
    <div className="main-content pb-4 flex flex-col">
      {dataElements}
    </div>
  )
}