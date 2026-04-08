import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import type { Metadata } from "next";
import "../../projects/[slug]/mdx.css";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return allPosts
    .filter((p) => p.published)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header post={post} />
      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={post.body.code} />
      </article>
    </div>
  );
}
