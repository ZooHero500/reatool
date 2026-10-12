import {readFileSync, readdirSync} from 'node:fs';
import {join, relative, resolve} from 'node:path';
import assert from 'node:assert/strict';
import {locales,languagePath} from './i18n-core.mjs';

const root = resolve('dist');
const origin = 'https://reatool.dev';
const walk = dir => readdirSync(dir, {withFileTypes:true}).flatMap(entry =>
  entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const text = html => decode(html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());
const pages = new Map();
const titles = new Set();
const descriptions = new Set();
let articles = 0;

for (const file of walk(root).filter(file => file.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  const path = '/' + relative(root, file).replace(/index\.html$/, '');
  const noindex = /<meta name="robots" content="noindex"/.test(html);
  if (path.endsWith('/404.html')) { assert(noindex, '404 must be noindex'); continue; }
  assert(!noindex, `${path}: content unexpectedly noindex`);
  const title = text(html.match(/<title>(.*?)<\/title>/s)[1]);
  const description = decode(html.match(/<meta name="description" content="([^"]+)"/)[1]);
  assert(/\bREA\b/.test(title) && /\bREA\b/.test(description), `${path}: REA context missing`);
  assert(!titles.has(title), `${path}: duplicate title`);
  assert(!descriptions.has(description), `${path}: duplicate description`);
  titles.add(title); descriptions.add(description);
  assert.equal(html.match(/<link rel="canonical" href="([^"]+)"/)[1], origin + path);
  assert.equal(decode(html.match(/<meta property="og:title" content="([^"]+)"/)[1]), title);
  assert.equal(decode(html.match(/<meta property="og:description" content="([^"]+)"/)[1]), description);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
  const page = graph.find(item => item['@id'] === origin + path + '#page');
  assert(page, `${path}: page entity missing`);
  assert.equal(page.name, title); assert.equal(page.description, description);
  assert.equal(page.url, origin + path);
  assert(graph.some(item => item['@id'] === page.isPartOf['@id']), `${path}: website reference unresolved`);
  const crumbs = graph.find(item => item['@type'] === 'BreadcrumbList');
  if (!locales.some(locale=>path===languagePath(locale.id,'/'))) {
    assert(crumbs, `${path}: breadcrumbs missing`);
    assert.equal(page.breadcrumb['@id'], crumbs['@id']);
    const nav = html.match(/<nav class="breadcrumbs"[^>]*>(.*?)<\/nav>/s)[1];
    const visible = [...nav.matchAll(/<li>(.*?)<\/li>/gs)].map(match => match[1]);
    assert.equal(visible.length, crumbs.itemListElement.length);
    crumbs.itemListElement.forEach((item, i) => {
      assert.equal(item.position, i + 1); assert.equal(item.name, text(visible[i]));
      const href = visible[i].match(/href="([^"]+)"/);
      assert.equal(item.item, href ? origin + href[1] : origin + path);
    });
  }
  if (page['@type'] === 'TechArticle') {
    articles++;
    assert.equal(page.headline, text(html.match(/<h1[^>]*>(.*?)<\/h1>/s)[1]));
    assert(graph.some(item => item['@id'] === page.author['@id']), `${path}: author reference unresolved`);
    assert.match(html, /class="related-guides"/, `${path}: related guides missing`);
  }
  pages.set(origin + path, {html, page});
}

const sitemap = [...readFileSync(join(root, 'sitemap.xml'), 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.equal(new Set(sitemap).size, sitemap.length, 'Duplicate sitemap entries');
assert.deepEqual([...pages.keys()].sort(), sitemap.sort(), 'Sitemap must cover every indexable page only');
assert.match(readFileSync(join(root, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/reatool.dev\/sitemap.xml/);
for (const locale of locales) {
const catalog = pages.get(origin + languagePath(locale.id,'/tutorials/'));
assert.equal(catalog.page['@type'], 'CollectionPage');
const list = catalog.page.mainEntity;
assert.equal(list.numberOfItems, articles/locales.length);
assert.equal(list.itemListElement.length, articles/locales.length);
assert.equal(new Set(list.itemListElement.map(item => item.url)).size, articles/locales.length);
list.itemListElement.forEach((item, i) => {
  assert.equal(item.position, i + 1);
  const guide = pages.get(item.url);
  assert.equal(guide?.page['@type'], 'TechArticle');
  assert.equal(item.name, guide.page.headline);
  assert(catalog.html.includes(`href="${new URL(item.url).pathname}"`), 'Catalog item must be a visible link');
});
assert.match(pages.get(origin + languagePath(locale.id,'/')).html, /id="what-is-rea"/);
assert.equal(pages.get(origin + languagePath(locale.id,'/about/')).page['@type'], 'AboutPage');
}
console.log(`${pages.size} indexable pages: unique REA metadata, matching breadcrumbs, ${articles} article entities, catalog and sitemap passed.`);
