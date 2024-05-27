import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "_data");

export function getData(slug) {
  const dataPath = path.join(dataDir, slug);
  if (fs.existsSync(dataPath)) {
    // console.log(dataPath)
    const date = new Date(slug.slice(0, 10)).toLocaleDateString(
      "en-US", 
      { month: 'long', day: 'numeric', year: 'numeric'} 
    );
    const content = fs.readFileSync(dataPath).toString();
    const text = content.split(/\n+/);
    return {
      date: date,
      path: slug.slice(0, -3),
      content: content,
      title: text[0].slice(2),
      prolog: text[1]
    }
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
    const rawFile = getData(fileName);
    allData.push(rawFile);
  });

  return allData.sort((a, b) => getTime(b) - getTime(a));
}
