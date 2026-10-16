import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const env = (globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
}).process?.env ?? {};
const repository = env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubActions = env.GITHUB_ACTIONS === 'true';
const base = isGitHubActions && repository && !repository.endsWith('.github.io')
  ? `/${repository}/`
  : '/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    emptyOutDir: true
  },
  server: {
    port: 3000,
    strictPort: true
  }
});
