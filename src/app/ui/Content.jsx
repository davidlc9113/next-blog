import Link from "next/link";
import { getAllData } from "../lib/data";

export default function Content() {
  const allData = getAllData();
  const dataElements = allData.map(e => {
    return <Link 
      href={`/articles/${e}`} 
      key={e} 
      className="hover:underline"
    >{e}</Link>
  });
  
  return (
    <div className="main-content pb-4 flex flex-col">
      {dataElements}
    </div>
  )
}