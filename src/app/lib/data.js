import fs from "fs";
import path from "path";

export function getAllData() {
  const filesDir = path.join(process.cwd(), "src", "data");
  const rawfiles = fs.readdirSync(filesDir);
  
  // sort by createdAt desc
  function getTime(e) {
    const stat = fs.statSync(path.join(filesDir, e));
    return new Date(stat.birthtime).getTime();
  }
  return rawfiles.sort((a, b) => getTime(b) - getTime(a));
}
