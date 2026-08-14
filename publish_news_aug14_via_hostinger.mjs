import { writeFile } from "node:fs/promises";
import { articles } from "./publish_news_aug14.mjs";

const endpoint = "https://billionairecollection.com/api/scheduled/news-refresh";

try {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ articles }),
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Hostinger scheduled news endpoint failed with HTTP ${response.status}: ${text}`);
  }
  const result = JSON.parse(text);
  if (result.ok !== true || result.upserted !== articles.length) {
    throw new Error(`Unexpected Hostinger publication response: ${text}`);
  }
  console.log(JSON.stringify({ success: true, ...result }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  await writeFile("/tmp/billionaire-collection-news-upsert-2026-08-14.error.log", `${new Date().toISOString()} ${message}\n`);
  console.error(message);
  process.exitCode = 1;
}
