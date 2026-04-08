import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about building products, engineering decisions, and the things I learn along the way.",
};

export default function BlogPage() {
  const posts = allPosts
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Blog
          </h2>
          <p className="mt-4 text-zinc-400">
            Writing about building products, engineering decisions, and the things I learn along the way.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        {posts.length === 0 ? (
          <p className="text-zinc-500">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-2">
            {posts.map((post) => (
              <Card key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <article className="p-4 md:p-8">
                    <div className="flex justify-between gap-2 items-center">
                      <time
                        dateTime={new Date(post.date).toISOString()}
                        className="text-xs text-zinc-200"
                      >
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(post.date))}
                      </time>
                      {post.tags && post.tags.length > 0 && (
                        <span className="text-xs text-zinc-500">
                          {post.tags.slice(0, 3).join(", ")}
                        </span>
                      )}
                    </div>
                    <h2 className="z-20 mt-4 text-xl font-medium duration-1000 lg:text-2xl text-zinc-200 group-hover:text-white font-display">
                      {post.title}
                    </h2>
                    <p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
                      {post.description}
                    </p>
                    <p className="mt-6 hidden text-zinc-200 hover:text-zinc-50 lg:block text-sm">
                      Read more <span aria-hidden="true">&rarr;</span>
                    </p>
                  </article>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
