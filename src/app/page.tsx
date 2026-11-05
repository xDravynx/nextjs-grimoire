import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <div className="min-h-screen bg-[#090d0b] text-[#cbd5e1] font-sans selection:bg-[#059669] selection:text-white">
      
      {/* Minimal Header */}
      <header className="border-b border-emerald-950/60 bg-[#090d0b]/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-emerald-400 tracking-tight text-lg">
            Verdant.
          </Link>
          <nav className="flex space-x-6 text-sm text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Articles</Link>
            <a href="#" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Newsletter</a>
          </nav>
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
              <article key={post._id} className="group">
                <Link 
                  href={`/${post.slug.current}`}
                  className="block p-6 rounded-xl bg-[#0f1713] border border-emerald-950/40 hover:border-emerald-800/60 transition-all"
                >
                  <div className="flex items-center space-x-3 text-xs text-emerald-500 mb-2 font-medium">
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-xl font-medium text-slate-100 group-hover:text-emerald-300 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <div className="flex items-center justify-between pt-2 border-t border-emerald-950/30 text-xs text-slate-500">
                    <span>Read post</span>
                    <span className="text-emerald-400 group-hover:translate-x-1 transition-transform font-medium">
                      &rarr;
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State if no posts are returned from Sanity */
          <div className="py-20 text-center rounded-2xl bg-[#0f1713]/40 border border-emerald-950/30">
            <div className="text-emerald-500 text-2xl mb-3">❖</div>
            <h3 className="text-slate-200 font-medium text-lg mb-1">No articles published yet</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
              Check back soon or publish your first document from your Sanity Studio.
            </p>
          </div>
        )}

        {/* Simple Newsletter Signup */}
        <div className="mt-16 p-8 rounded-2xl bg-[#0d1511] border border-emerald-900/30 text-center">
          <h3 className="text-lg font-medium text-slate-100 mb-2">
            Get new articles in your inbox
          </h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
            No spam, just thoughtful notes on design and development sent out whenever a new piece goes live.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#070b09] border border-emerald-950 text-slate-200 text-sm focus:outline-none focus:border-emerald-600"
            />
            <button className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-500 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-950/60 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Verdant Blog. Built with Next.js, Sanity, and Tailwind CSS.</p>
      </footer>
    </div>
  );
}