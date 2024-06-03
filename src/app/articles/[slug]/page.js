import Container from "@/app/ui/Container"
import { getData } from "@/app/lib/data"
import { METADATA } from "@/app/lib/constants";

import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import SyntaxHighlighter from 'react-syntax-highlighter'
import { 
  stackoverflowLight as style
} from 'react-syntax-highlighter/dist/esm/styles/hljs';

const getArticle = (params) => {
  return getData(`${params.slug}.md`);
}

export function generateMetadata({ params }) {
  const article = getArticle(params);
  const articleTitle = `${article.title} | ${METADATA.title}`;
  return {
    title: articleTitle,
    openGraph: {
      title: articleTitle
    }
  };
}

export default function Article({ params }) {
  const article = getArticle(params);
  
  if (!article) {
    return notFound();
  }
  
  return (
    <Container>
      <div className="main-content w-full max-w-sm md:max-w-3xl">
        <Markdown
          components={{
            code(props) {
              const {children, className, node, ...rest} = props
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  className="w-full"
                  language={match[1]}
                  style={style}
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