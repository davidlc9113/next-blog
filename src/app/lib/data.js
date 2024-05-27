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
    const date = new Date(fileName.slice(0, 10)).toLocaleDateString(
      "en-US", 
      { month: 'long', day: 'numeric', year: 'numeric'} 
    );
  console.log(fileName.slice(0, -3))
  const text = getData(fileName).split(/\n+/);
    allData.push({
      file: fileName, 
      path: fileName.slice(0, -3),
      date: date,
      title: text[0].slice(2),
      prolog: text[1]
    });
  });
  return allData.sort((a, b) => getTime(b) - getTime(a));
}
