// TypeScript version of the CSpell config.
// Requires Node.js >= 22.18 to run natively.
import { defineConfig } from 'cspell';

export default defineConfig({
  version: '0.2',
  dictionaryDefinitions: [
    {
      name: 'project-words',
      path: './project-words.txt',
      addWords: true,
    },
  ],
  dictionaries: ['project-words'],
  ignorePaths: [
    'dist',
    'node_modules',
    '/project-words.txt',
    'pnpm-lock.yaml',
    'pnpm-workspace.yaml',
    // 测试报告
    'coverage',
  ],
});
