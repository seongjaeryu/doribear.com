"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
	post: {
		title: string;
		description: string;
		date: string;
		tags?: string[];
	};
};

export const Header: React.FC<Props> = ({ post }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header
			ref={ref}
			className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
		>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-white/10 border-zinc-200 lg:border-transparent"
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<Link
							href="/blog"
							className={`text-sm duration-200 hover:font-medium ${
								isIntersecting
									? "text-zinc-400 hover:text-zinc-100"
									: "text-zinc-600 hover:text-zinc-900"
							}`}
						>
							All posts
						</Link>
					</div>
					<Link
						href="/blog"
						className={`duration-200 hover:font-medium ${
							isIntersecting
								? "text-zinc-400 hover:text-zinc-100"
								: "text-zinc-600 hover:text-zinc-900"
						}`}
					>
						<ArrowLeft className="w-6 h-6" />
					</Link>
				</div>
			</div>

			<div className="container mx-auto relative isolate overflow-hidden py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
					<div className="mx-auto max-w-2xl lg:mx-0">
						{post.date && (
							<time
								dateTime={new Date(post.date).toISOString()}
								className="block mb-4 text-sm text-zinc-500"
							>
								{Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
									new Date(post.date),
								)}
							</time>
						)}
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
							{post.title}
						</h1>
						<p className="mt-6 text-lg leading-8 text-zinc-300">
							{post.description}
						</p>
						{post.tags && post.tags.length > 0 && (
							<div className="mt-6 flex flex-wrap justify-center gap-2">
								{post.tags.map((tag) => (
									<span
										key={tag}
										className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-zinc-400"
									>
										{tag}
									</span>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};
