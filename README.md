# Mock Issue Demo

This example demonstrates the issue with `vi.mock()` not working when using along with a setup file in Cloudflare Workers, using the same setup as [vitest-pool-workers/d1](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/d1).

## The Issue

When using Vitest with Cloudflare Workers and a setup which imports modules from "cloudflare:test", `vi.mock()` won't be applied.

You can reproduce this by running `npx vitest --run`, and notice the uuid mock isn't being applied.

By commenting out the content of `test/vitest.setup.ts`, and then running the tests again, you can see that the tests pass.

## Workaround

It's possible to call `vi.resetModules()` before setting up your mocks. This ensures that the module cache is cleared and that your mocks are properly applied.

```javascript
import { vi } from "vitest";

// Reset modules before mocking
vi.resetModules();

// Then apply your mocks
vi.mock("./path/to/module", () => ({
  // your mock implementation
}));
```
