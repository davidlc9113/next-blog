import { getAllData } from "./lib/data";
import { BASE_URL } from "./lib/constants";

export default function sitemap() {
  return [
    ...[
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1
      }
    ],
    ...getAllData().map(e => {
      return {
        url: `${BASE_URL}/articles/${e.path}`,
        lastModified: new Date(e.date),
        changeFrequency: 'daily',
        priority: 0.9
      }
    })
  ];
}
