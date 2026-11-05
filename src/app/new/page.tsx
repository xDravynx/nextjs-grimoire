import Link from "next/link";
import { createPostAction } from "@/app/actions";

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-[#090d0b] text-[#cbd5e1] font-sans selection:bg-[#059669] selection:text-white">
      
      {/* Header */}
      <header className="border-b border-emerald-950/60 bg-[#090d0b]/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-emerald-400 tracking-tight text-lg">
            xDravynx.
          </Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
            &larr; Back to articles
          </Link>
        </div>
      </header>

      {/* Form Container */}
      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-100 tracking-tight mb-2">
            Publish New Article
          </h1>
          <p className="text-slate-400 text-sm">
            Fill out the fields below to publish a new post directly to your xDravynx journal.
          </p>
        </div>

        <form action={createPostAction} className="space-y-6 p-8 rounded-xl bg-[#0f1713] border border-emerald-950/40">
          
          <div className="space-y-2">
            <label htmlFor="title" className="block text-xs uppercase tracking-widest text-emerald-400 font-medium">
              Article Title
            </label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              required
              placeholder="e.g., The Architecture of Minimal Interfaces"
              className="w-full px-4 py-3 rounded-lg bg-[#070b09] border border-emerald-950 text-slate-200 text-sm focus:outline-none focus:border-emerald-600 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="excerpt" className="block text-xs uppercase tracking-widest text-emerald-400 font-medium">
              Excerpt / Summary
            </label>
            <textarea 
              id="excerpt" 
              name="excerpt" 
              rows={4}
              placeholder="A brief introduction or summary of your post..."
              className="w-full px-4 py-3 rounded-lg bg-[#070b09] border border-emerald-950 text-slate-200 text-sm focus:outline-none focus:border-emerald-600 transition-colors resize-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-4">
            <Link 
              href="/"
              className="px-5 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-950/50"
            >
              Publish Article
            </button>
          </div>

        </form>
      </main>

      <footer className="border-t border-emerald-950/60 py-8 text-center text-xs text-slate-500">
        <p>© 2026 xDravynx. Built with Next.js, Sanity, and Tailwind CSS.</p>
      </footer>
    </div>
  );
}