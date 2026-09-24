'use client';

import ReactMarkdown, { type ExtraProps } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import type { Element } from 'hast';

export default function MarkdownProse({ content, className, style }: { content: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={style}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) => {
            const isInternal = href?.startsWith('/');
            if (isInternal && href) {
              return (
                <Link
                  href={href}
                  className="text-ink underline"
                  style={{ textUnderlineOffset: '3px' }}
                  {...props}
                >
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                className="text-ink underline"
                style={{ textUnderlineOffset: '3px' }}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            );
          },
          p: ({ node, children, ...props }: ComponentPropsWithoutRef<'p'> & ExtraProps) => {
            const onlyChild = (node as Element | undefined)?.children;
            const isImageOnly = onlyChild?.length === 1 && onlyChild[0].type === 'element' && onlyChild[0].tagName === 'img';
            if (isImageOnly) {
              return <>{children}</>;
            }
            return <p {...props}>{children}</p>;
          },
          img: ({ src, alt }: ComponentPropsWithoutRef<'img'>) => (
            <figure style={{ margin: '40px 0' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={typeof src === 'string' ? src : undefined}
                alt={alt ?? ''}
                style={{
                  width: '100%',
                  display: 'block',
                  border: '2px solid #000',
                }}
              />
              {alt ? (
                <figcaption
                  style={{
                    fontSize: '13px',
                    color: '#6a6a6a',
                    marginTop: '10px',
                    textAlign: 'center',
                    fontStyle: 'italic',
                  }}
                >
                  {alt}
                </figcaption>
              ) : null}
            </figure>
          ),
          blockquote: ({ children }: ComponentPropsWithoutRef<'blockquote'>) => (
            <blockquote
              style={{
                margin: '32px 0',
                paddingLeft: '20px',
                borderLeft: '2px solid #000',
                fontStyle: 'italic',
                color: '#3a3a3a',
              }}
            >
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
