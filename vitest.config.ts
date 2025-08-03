import { defineWorkersProject } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersProject(async () => {
  return {
    test: {
      setupFiles: ["./test/vitest.setup.ts"],
      poolOptions: {
        workers: {
          singleWorker: true,
          wrangler: {
            environment: "test",
            configPath: "./wrangler.jsonc",
          },
        },
      },
    },
  };
});
