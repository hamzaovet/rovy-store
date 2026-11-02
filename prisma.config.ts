import "dotenv/config";
import { defineConfig } from "prisma/config";

const rawUrl =
  process.env.DATABASE_URL?.replace("&channel_binding=require", "") ||
  "postgresql://neondb_owner:npg_KynD7uAa6vZr@ep-muddy-math-b9j80lh8-pooler.c-7.eu-central-1.aws.neon.tech/neondb?sslmode=require";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: rawUrl,
  },
});
