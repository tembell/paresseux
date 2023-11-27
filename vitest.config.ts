import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: '@tembell/paresseux',
    // Keeping globals to true triggers React Testing Library's auto cleanup
    // https://vitest.dev/guide/migration.html
    globals: true,
    setupFiles: "./tests/setup.ts",
    environment: 'jsdom',
    dir: 'tests',
    reporters: 'basic',
    coverage: {
      reporter: ['text', 'json', 'html', 'text-summary'],
      reportsDirectory: './coverage/',
    },
  },
})
