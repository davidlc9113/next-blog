import Container from "@/app/ui/Container"
import { getData } from "@/app/lib/data"
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

export default function Article({ params }) {
  const article = getData(params.slug);
  if (!article) {
    return notFound();
  }
  
  return (
    <Container>
      <div className="main-content">
        <Markdown>{article}</Markdown>
      </div>
    </Container>
  )
}