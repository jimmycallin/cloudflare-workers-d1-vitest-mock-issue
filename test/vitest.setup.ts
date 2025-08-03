import { applyD1Migrations, env } from "cloudflare:test";

await applyD1Migrations(env.DB, []);

// This is the reason the mocking isn't working.
// By commenting out the content of this file, the tests will pass.
