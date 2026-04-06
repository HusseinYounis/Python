# Python for Engineers - Course Book

A comprehensive interactive Python course for students with C++ and Java background. Built with Vite and CodeMirror 6.

## Features

- **14 chapters** covering Python fundamentals to applied engineering
- **CodeMirror 6** syntax-highlighted, read-only code blocks with Python/C++/Shell support
- **One Dark theme** for code blocks with copy-to-clipboard
- **Responsive design** with sidebar table-of-contents and scroll spy
- **SPA routing** with hash-based navigation
- **Fast builds** with Vite

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

This project includes a GitHub Actions workflow for automatic deployment.

### Setup

1. Create a GitHub repository and push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. In your GitHub repository, go to **Settings → Pages**:
   - Set **Source** to **GitHub Actions**

3. The site will automatically deploy on every push to `main`.

### Custom Base Path

If your repo is at `https://github.com/user/python-course`, the site will be at `https://user.github.io/python-course/`.

Update `vite.config.js` if needed:
```js
export default defineConfig({
  base: '/python-course/',  // match your repo name
});
```

## Project Structure

```
├── .github/workflows/deploy.yml   # GitHub Actions deployment
├── public/chapters/               # Chapter HTML content (fetched at runtime)
│   ├── 01.html ... 14.html        # Chapter body content
│   └── 01-toc.html ... 14-toc.html # Sidebar TOC content
├── src/
│   ├── lib/
│   │   ├── codemirror-blocks.js   # CodeMirror initialization
│   │   ├── router.js              # Hash-based SPA router
│   │   ├── scroll-spy.js          # Sidebar scroll spy
│   │   └── templates.js           # Page templates (index + chapter)
│   ├── chapters.js                # Chapter metadata
│   ├── main.js                    # App entry point
│   └── style.css                  # Styles (layout + CodeMirror overrides)
├── index.html                     # Single HTML entry point
└── vite.config.js                 # Vite configuration
```

## Tech Stack

- [Vite](https://vite.dev/) - Build tool
- [CodeMirror 6](https://codemirror.net/) - Code editor/viewer
- Vanilla JavaScript - No framework dependency
