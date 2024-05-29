import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "_data");

export function getData(fileName) {
  const dataPath = path.join(dataDir, fileName);
  if (fs.existsSync(dataPath)) {
    const date = new Date(fileName.slice(0, 10)).toLocaleDateString(
      "en-US", 
      { month: 'long', day: 'numeric', year: 'numeric'} 
    );
    const content = fs.readFileSync(dataPath).toString();
    const text = content.split(/\n+/);
    return {
      date: date,
      path: fileName.slice(0, -3),
      content: content,
      title: text[0].slice(2),
      intro: text[1]
    }
  }
}

export function getAllData() {
  const allData = [];
  const rawFiles = fs.readdirSync(dataDir);
  
  function getCreated(e) {
    return new Date(e.date).getTime();
  }

  return rawFiles
    .map(e => getData(e))
    .sort((a, b) => getCreated(b) - getCreated(a));
}
