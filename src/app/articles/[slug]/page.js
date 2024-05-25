import Container from "@/app/ui/Container"
import { getData } from "@/app/lib/data"
import { notFound } from "next/navigation";

export default function Article({ params }) {
  const article = getData(params.slug);
  if (!article) {
    return notFound();
  }
  
  return (
    <Container>
      <div className="main-content">
        <p>{article}</p>
      </div>
    </Container>
  )
}