import { getCollection, type CollectionEntry } from 'astro:content';
import { readingTime } from './format';

export type Post = CollectionEntry<'posts'>;

const byDateDesc = (a: Post, b: Post) => b.data.date.valueOf() - a.data.date.valueOf();

export const isPublished = (post: Post) => (import.meta.env.PROD ? !post.data.draft : true);

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', isPublished);
  return posts.sort(byDateDesc);
}

export const postHref = (post: Post) => `/posts/${post.id}`;

export const postMinutes = (post: Post) => readingTime(post.body);

export function collectTags(posts: Post[]) {
  const map = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count, slug: tagSlug(name) }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'ru'));
}

const translit: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i',
  й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't',
  у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '',
  э: 'e', ю: 'yu', я: 'ya',
};

export function tagSlug(tag: string) {
  return tag
    .toLowerCase()
    .trim()
    .split('')
    .map((char) => translit[char] ?? char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
