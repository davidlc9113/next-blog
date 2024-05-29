import Container from "@/app/ui/Container"
import { getData } from "@/app/lib/data"
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

const getArticle = (params) => {
  return getData(`${params.slug}.md`);
}

export function generateMetadata({ params }) {
  const article = getArticle(params);
  return { title: `${article.title} | David Li Blog` };
}

export default function Article({ params }) {
  const article = getArticle(params);
  
  if (!article) {
    return notFound();
  }
  
  return (
    <Container>
      <div className="main-content">
        <Markdown>{article.content}</Markdown>
      </div>
    </Container>
  )
}