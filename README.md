# Project Gutenberg Explorer

A single-page React application that lets you find, view, and analyze public-domain books from Project Gutenberg. It uses the [Gutendex API](https://gutendex.com/) for searching by title, author, or ID, plus Ant Design (AntD) for a clean, consistent UI. Summaries and additional text analysis are handled by an LLM, with a chunking approach for large texts and a built-in cooldown to avoid rate limits.

## Installation

1. **Clone the repository** (or download the source code):

   ```bash
   git clone https://github.com/wang-yikai/project-gutenberg-explorer.git
   ```

2. **Navigate to the project folder**:
   ```bash
   cd project-gutenberg-explorer
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

## Scripts

- **Development Server**

  ```bash
  npm run dev
  ```

  Starts the application in development mode using [Vite](https://vitejs.dev/). Open your browser at the URL shown in the console.

- **Build**

  ```bash
  npm run build
  ```

  Produces an optimized production build inside the `dist` folder.

- **Preview**

  ```bash
  npm run preview
  ```

  Serves the production build locally. Useful for testing your optimized code before deployment.

- **Lint**
  ```bash
  npm run lint
  ```
  Runs ESLint on your code to ensure quality and consistency.
