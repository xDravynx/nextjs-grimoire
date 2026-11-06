import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { notFound } from "next/navigation";

export const instant = false;

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
const options = { next: { revalidate: 30 } };

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await client.fetch<SanityDocument>(POST_QUERY, resolvedParams, options);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#090d0b] text-[#cbd5e1] font-sans selection:bg-[#059669] selection:text-white">
      
      {/* Header */}
      <header className="border-b border-emerald-950/60 bg-[#090d0b]/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-emerald-400 tracking-tight text-lg">
            xDravynx
          </Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
            &larr; Back to articles
          </Link>
        </div>
      </header>

      {/* Article Container */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <article className="space-y-8">
          
          <div className="space-y-3">
            {post.publishedAt && (
              <div className="text-xs text-emerald-500 font-medium tracking-wide uppercase">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-semibold text-slate-100 tracking-tight leading-tight">
              {post.title}
            </h1>
          </div>

          <hr className="border-emerald-950/60" />

          <div className="text-slate-300 leading-relaxed space-y-6 text-base md:text-lg font-light">
            <p>
              {post.excerpt || "Article content loading..."}
            </p>
          </div>

        </article>

        <div className="mt-20 pt-8 border-t border-emerald-950/60 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium inline-flex items-center gap-2"
          >
            &larr; Return to all entries
          </Link>
          <span className="text-xs text-slate-500">xDravynx Archive</span>
        </div>
      </main>

      <footer className="border-t border-emerald-950/60 py-8 text-center text-xs text-slate-500">
        <p>© 2026 xDravynx. Built with Next.js, Sanity, and Tailwind CSS.</p>
      </footer>
    </div>
  );
}