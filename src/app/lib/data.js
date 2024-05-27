import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "_data");

export function getData(slug) {
  const dataPath = path.join(dataDir, slug);
  if (fs.existsSync(dataPath)) {
    return fs.readFileSync(dataPath).toString();
  }
}

export function getAllData() {
  const allData = [];
  const rawFiles = fs.readdirSync(dataDir);
  
  // sort by createdAt desc
  function getTime(e) {
    return new Date(e.stat.birthtime).getTime();
  }

  rawFiles.forEach(fileName => {
    const stat = fs.statSync(path.join(dataDir, fileName));
    allData.push({ file: fileName, stat: stat });
  });
  return allData.sort((a, b) => getTime(b) - getTime(a));
}
