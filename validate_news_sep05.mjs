import { articles, validateBatch } from "./publish_news_sep05_direct.mjs";

try {
  validateBatch();
  console.log(JSON.stringify({ valid: true, count: articles.length, featured: articles.filter(article => article.isFeatured).length, categories: [...new Set(articles.map(article => article.category))] }));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
