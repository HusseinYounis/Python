import './style.css';
import { onRoute } from './lib/router.js';
import { renderIndex, renderChapter } from './lib/templates.js';
import { initCodeBlocks } from './lib/codemirror-blocks.js';
import { initScrollSpy } from './lib/scroll-spy.js';

const app = document.getElementById('app');
let cleanupScrollSpy = null;

onRoute((route) => {
  if (cleanupScrollSpy) {
    cleanupScrollSpy();
    cleanupScrollSpy = null;
  }

  if (route.page === 'chapter') {
    app.innerHTML = renderChapter(route);
    initCodeBlocks(app);
    cleanupScrollSpy = initScrollSpy();
    window.scrollTo(0, 0);
  } else {
    app.innerHTML = renderIndex(route.chapters);
    window.scrollTo(0, 0);
  }
});
