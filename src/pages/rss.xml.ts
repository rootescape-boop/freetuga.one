import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postHref } from '../lib/posts';
import { site } from '../lib/site';

export async function GET(context: APIContext) {
  const posts = await getPosts();

  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? 'https://freetuga.one',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: postHref(post),
      categories: post.data.tags,
    })),
    customData: '<language>ru</language>',
  });
}
