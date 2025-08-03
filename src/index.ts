import { Hono } from "hono";
import * as uuid from "uuid";
const app = new Hono();

app.get("/user", async (c) => {
  console.log("Fetching user data...", uuid.v4.toString());
  const userData = {
    id: uuid.v4(),
  };
  return c.json({
    success: true,
    user: userData,
  });
});

export default app;
