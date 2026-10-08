import { type CollectionEntry, getCollection } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** All posts, newest first. */
export async function getPosts(): Promise<Post[]> {
	return (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

/** URL-safe version of a tag name: "AWS Lambda" -> "aws-lambda". */
export function tagSlug(tag: string): string {
	return tag
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

/** Every tag with its post count, most-used first. */
export function tagCounts(posts: Post[]): { tag: string; slug: string; count: number }[] {
	const counts = new Map<string, { tag: string; count: number }>();
	for (const post of posts) {
		for (const tag of post.data.tags) {
			const slug = tagSlug(tag);
			const entry = counts.get(slug) ?? { tag, count: 0 };
			entry.count += 1;
			counts.set(slug, entry);
		}
	}
	return [...counts]
		.map(([slug, { tag, count }]) => ({ tag, slug, count }))
		.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Rough reading time in minutes at ~230 words per minute. */
export function readingMinutes(body: string | undefined): number {
	const words = (body ?? '')
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/<[^>]+>/g, ' ')
		.split(/\s+/)
		.filter(Boolean).length;
	return Math.max(1, Math.round(words / 230));
}
