export function renderIndex(chapters) {
  const cards = chapters.map(ch => `
    <a href="#chapter/${ch.id}" class="group block bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary-300 transition-all">
      <div class="flex items-start gap-3">
        <span class="flex-shrink-0 w-9 h-9 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold">${ch.id}</span>
        <div>
          <h3 class="font-semibold text-slate-900 group-hover:text-primary-700 transition-colors">${ch.title}</h3>
          <p class="text-sm text-slate-500 mt-1">${ch.desc}</p>
        </div>
      </div>
    </a>
  `).join('');

  return `
    <header class="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-blue-900">
      <div class="absolute inset-0 opacity-10" style="background-image:url('data:image/svg+xml,%3Csvg width=60 height=60 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 30h60M30 0v60%22 stroke=%22%23fff%22 stroke-width=%22.5%22/%3E%3C/svg%3E');"></div>
      <div class="relative max-w-5xl mx-auto px-6 py-16 text-center">
        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-sm text-blue-200 mb-4">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          Course No. 230215600
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">SELECTED PROGRAMMING LANGUAGE</h1>
        <h2 class="text-xl font-semibold text-blue-200 mb-4">Python for Engineers</h2>
        <p class="text-lg text-blue-200/80 max-w-2xl mx-auto mb-6">A comprehensive interactive course for students with C++ and Java background. ${chapters.length} chapters covering Python fundamentals to applied engineering.</p>
        <div class="inline-flex items-center gap-2 text-sm text-blue-300">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          MR. Hussein Younis
        </div>
      </div>
    </header>
    <main class="max-w-5xl mx-auto px-6 py-12">
      <div class="flex items-center gap-3 mb-8">
        <div class="h-1 w-10 bg-primary-500 rounded"></div>
        <h2 class="text-2xl font-bold text-slate-900">Table of Contents</h2>
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        ${cards}
      </div>
    </main>
    <footer class="border-t border-slate-200 mt-8">
      <div class="max-w-5xl mx-auto px-6 py-6 text-center text-sm text-slate-400">Selected Programming Language (230215600) &mdash; MR. Hussein Younis</div>
    </footer>
  `;
}

export function renderChapter({ chapter, content, toc, prev, next, current, total }) {
  const prevLink = prev
    ? `<a href="#chapter/${prev.id}" class="text-primary-600 hover:text-primary-800 text-sm flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
        ${prev.title}
      </a>`
    : '<span></span>';

  const nextLink = next
    ? `<a href="#chapter/${next.id}" class="text-primary-600 hover:text-primary-800 text-sm flex items-center gap-1 ml-auto">
        ${next.title}
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
      </a>`
    : '<span></span>';

  const tocHtml = toc
    ? `<nav class="sidebar-toc">${toc}</nav>`
    : '';

  return `
    <header class="bg-gradient-to-r from-primary-800 to-primary-900 border-b border-primary-700">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" class="text-blue-200 hover:text-white text-sm flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          Table of Contents
        </a>
        <span class="text-blue-300 text-sm font-medium">Chapter ${current} of ${total}</span>
      </div>
    </header>
    <div class="page-wrapper">
      <article class="chapter-content">
        ${content}
        <nav class="flex justify-between items-center mt-10 pt-6 border-t border-slate-200 text-sm">
          ${prevLink}
          ${nextLink}
        </nav>
      </article>
      ${tocHtml}
    </div>
  `;
}
