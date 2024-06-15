export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
export const ARTICLE_URL = (path) => `${BASE_URL}/articles/${path}`;
export const METADATA= {
  title: "David Li Blog",
  description: "Learning React and watching Netflix"
};
