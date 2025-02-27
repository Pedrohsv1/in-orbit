import { defineConfig } from "tsup";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  entry: ["src/**/*.{ts,tsx}"],
  clean: true,
  format: "esm",
  outDir: "dist",
});
