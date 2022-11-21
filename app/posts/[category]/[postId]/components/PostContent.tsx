
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'

import AddBookmark from "./AddBookmark";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Post } from '@prisma/client'
import styles from './PostContent.module.css'


SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("tsx", tsx);


export default function PostContent({post, category }: {post: Post, category: string }) {

    const readableDate = new Date(post.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const MarkdownComponents: Components = {
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, '')}
            style={atomDark}
            language={match[1]}
            PreTag="div"
            //{...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
    }
  
    return (
    <div className={styles.container}>
        <section className={styles.headerContainer}>
          <div className={styles.postTitle}>
            <h1 className={styles[`${category}Title`]}>{post.title}</h1>
          </div>
          <div className={styles.date}>
            <p>{readableDate}</p>
            <AddBookmark postId={post.id}/>
          </div>
        </section>
        <section className={styles.contentContainer}>
          <ReactMarkdown 
            className={styles.content} 
            rehypePlugins={[rehypeRaw]} 
            components={MarkdownComponents}>
              {post.body}
          </ReactMarkdown>
        </section>
    </div>
    )
    }

