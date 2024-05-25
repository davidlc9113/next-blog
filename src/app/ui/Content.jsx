import Link from "next/link";
import { getAllData } from "../lib/data";

export default function Content() {
  const allData = getAllData();
  const dataElements = allData.map(e => {
    return <Link href={e} key={e}>{e}</Link>
  });
  
  return (
    <div className="flex-grow pb-4 flex flex-col">
      {dataElements}
    </div>
  )
}