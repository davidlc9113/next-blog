import Container from "@/app/ui/Container"
import { getData } from "@/app/lib/data"
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

const getArticle = (params) => {
  return getData(`${params.slug}.md`);
}

export function generateMetadata({ params }) {
  const article = getArticle(params);
  return { title: `${article.title} | David Li's Blog` };
}

export default function Article({ params }) {
  const article = getArticle(params);
  
  if (!article) {
    return notFound();
  }
  
  return (
    <Container>
      <div className="main-content">
        <Markdown
          components={{
            code(props) {
              const {children, className, node, ...rest} = props
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  className="max-w-sm md:max-w-xl"
                  language={match[1]}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              )
            }
          }}
        >
          {article.content}
        </Markdown>
      </div>
    </Container>
  )
}