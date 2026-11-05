import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { deletePostAction } from "@/app/actions";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <div className="min-h-screen bg-[#090d0b] text-[#cbd5e1] font-sans selection:bg-[#059669] selection:text-white">
      
      {/* Header */}
      <header className="border-b border-emerald-950/60 bg-[#090d0b]/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-emerald-400 tracking-tight text-lg">
            xDravynx.
          </Link>
          <div className="flex items-center space-x-6">
            <Link 
              href="/new" 
              className="px-4 py-2 rounded-lg bg-emerald-600/20 border border-emerald-600/40 text-emerald-300 hover:bg-emerald-600/30 text-xs font-medium uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <span>+</span> New Post
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Intro */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-100 tracking-tight mb-3">
          Writing on design, code, and interfaces.
        </h1>
        <p className="text-slate-400 text-base max-w-xl leading-relaxed">
          Thoughts, tutorials, and deep dives exploring the intersection of aesthetics and clean engineering.
        </p>
      </section>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 pb-20">
        {posts && posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post._id} className="p-6 rounded-xl bg-[#0f1713] border border-emerald-950/40 hover:border-emerald-800/60 transition-all flex items-start justify-between gap-4 group">
                
                {/* Clickable Post Content Link */}
                <Link href={`/${post.slug.current}`} className="flex-1">
                  <div className="text-xs text-emerald-500 mb-2 font-medium">
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-xl font-medium text-slate-100 group-hover:text-emerald-300 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <span className="text-xs text-emerald-400 inline-flex items-center gap-1 font-medium">
                    Read post &rarr;
                  </span>
                </Link>

                {/* Delete Form Action */}
                <form action={deletePostAction}>
                  <input type="hidden" name="postId" value={post._id} />
                  <button 
                    type="submit"
                    aria-label="Delete post"
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 border border-transparent hover:border-rose-900/30 transition-all text-xs"
                    title="Delete post"
                  >
                    🗑️
                  </button>
                </form>

              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-2xl bg-[#0f1713]/40 border border-emerald-950/30">
            <div className="text-emerald-500 text-2xl mb-3">❖</div>
            <h3 className="text-slate-200 font-medium text-lg mb-1">No articles published yet</h3>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-950/60 py-8 text-center text-xs text-slate-500">
        <p>© 2026 xDravynx. Built with Next.js, Sanity, and Tailwind CSS.</p>
      </footer>
    </div>
  );
}