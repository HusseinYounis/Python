import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';
import {
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
} from '@codemirror/view';
import {
  foldGutter,
  indentOnInput,
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
} from '@codemirror/language';

function detectLanguage(code) {
  const trimmed = code.trim();
  const first = trimmed.split('\n')[0].toLowerCase();

  // C++ detection
  if (first.startsWith('//') || first.includes('cout') || first.includes('std::') || first.includes('#include')) return 'cpp';

  // Shell / command-line detection
  if (first.startsWith('$') || first.startsWith('pip ') || first.startsWith('python ') || first.startsWith('pytest ')) return 'shell';
  if (first.startsWith('#') && (first.includes('bash') || first.includes('terminal') || first.includes('shell') || first.includes('run '))) return 'shell';

  // Directory tree / plain text detection (e.g., myproject/, ├──, BaseException)
  if (/^[a-z_]+\/$/m.test(first) || trimmed.includes('├──') || trimmed.includes('└──') || trimmed.includes('+--')) return 'shell';

  // Requirements file (package>=version)
  if (/^[a-z][a-z0-9_-]*[><=]=?\d/m.test(first)) return 'shell';

  return 'python';
}

function langExtension(lang) {
  if (lang === 'cpp') return cpp();
  return python();
}

const copyIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
const checkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

export function initCodeBlocks(container) {
  const pres = container.querySelectorAll('pre');

  pres.forEach((pre) => {
    if (pre.closest('.code-block')) return;

    const code = (pre.querySelector('code') || pre).textContent;
    const lines = code.split('\n');
    if (lines.length > 1 && lines[lines.length - 1].trim() === '') lines.pop();
    const cleanCode = lines.join('\n');

    const lang = detectLanguage(cleanCode);

    // Build wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';

    // Header
    const header = document.createElement('div');
    header.className = 'code-header';
    header.innerHTML = `
      <div class="code-dots"><span></span><span></span><span></span></div>
      <span class="code-lang">${lang}</span>
      <button class="code-copy" aria-label="Copy code">
        ${copyIcon} Copy
      </button>`;
    wrapper.appendChild(header);

    // CodeMirror container
    const cmContainer = document.createElement('div');
    cmContainer.className = 'cm-container';
    wrapper.appendChild(cmContainer);

    pre.parentElement.replaceChild(wrapper, pre);

    // Initialize CodeMirror
    const extensions = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      drawSelection(),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      highlightActiveLine(),
      oneDark,
      langExtension(lang),
      EditorView.editable.of(false),
      EditorState.readOnly.of(true),
      EditorView.lineWrapping,
    ];

    new EditorView({
      state: EditorState.create({
        doc: cleanCode,
        extensions,
      }),
      parent: cmContainer,
    });

    // Copy handler
    const copyBtn = header.querySelector('.code-copy');
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(cleanCode).then(() => {
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = `${checkIcon} Copied!`;
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = `${copyIcon} Copy`;
        }, 2000);
      });
    });
  });
}
