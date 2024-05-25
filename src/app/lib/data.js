import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "src", "data");

export function getData(slug) {
  const dataPath = path.join(dataDir, slug);
  if (fs.existsSync(dataPath)) {
    return fs.readFileSync(dataPath).toString();
  }
}

export function getAllData() {
  const rawData = fs.readdirSync(dataDir);
  
  // sort by createdAt desc
  function getTime(e) {
    const stat = fs.statSync(path.join(dataDir, e));
    return new Date(stat.birthtime).getTime();
  }
  return rawData.sort((a, b) => getTime(b) - getTime(a));
}
