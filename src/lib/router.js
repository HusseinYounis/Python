import { chapters } from '../chapters.js';

const cache = {};

function getHash() {
  return window.location.hash.slice(1) || '';
}

function parseRoute() {
  const hash = getHash();
  const match = hash.match(/^chapter\/(\d{2})$/);
  if (match) return { page: 'chapter', id: match[1] };
  return { page: 'index' };
}

async function fetchChapter(id) {
  if (cache[id]) return cache[id];
  const res = await fetch(`${import.meta.env.BASE_URL}chapters/${id}.html`);
  if (!res.ok) throw new Error(`Chapter ${id} not found`);
  const html = await res.text();
  cache[id] = html;
  return html;
}

async function fetchToc(id) {
  const key = `toc-${id}`;
  if (cache[key]) return cache[key];
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}chapters/${id}-toc.html`);
    if (!res.ok) return '';
    const html = await res.text();
    cache[key] = html;
    return html;
  } catch {
    return '';
  }
}

export function navigate(hash) {
  window.location.hash = hash;
}

export function onRoute(callback) {
  async function handle() {
    const route = parseRoute();
    if (route.page === 'chapter') {
      const chapter = chapters.find(c => c.id === route.id);
      if (!chapter) {
        callback({ page: 'index', chapters });
        return;
      }
      const idx = chapters.indexOf(chapter);
      const [content, toc] = await Promise.all([
        fetchChapter(route.id),
        fetchToc(route.id),
      ]);
      callback({
        page: 'chapter',
        chapter,
        content,
        toc,
        prev: idx > 0 ? chapters[idx - 1] : null,
        next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
        current: idx + 1,
        total: chapters.length,
      });
    } else {
      callback({ page: 'index', chapters });
    }
  }

  window.addEventListener('hashchange', handle);
  handle();
}
