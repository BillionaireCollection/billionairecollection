import mysql from "mysql2/promise";
import { articles } from "./publish_news_aug13.mjs";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required for a Hostinger-native news publication run");
}

const pool = mysql.createPool(process.env.DATABASE_URL);
const statement = `
  INSERT INTO news_articles
    (slug, title, summary, category, source, imageUrl, articleUrl, isFeatured, publishedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    title = VALUES(title),
    summary = VALUES(summary),
    category = VALUES(category),
    source = VALUES(source),
    imageUrl = VALUES(imageUrl),
    articleUrl = VALUES(articleUrl),
    isFeatured = VALUES(isFeatured),
    publishedAt = VALUES(publishedAt)
`;

try {
  for (const article of articles) {
    await pool.execute(statement, [
      article.slug,
      article.title,
      article.summary,
      article.category,
      article.source,
      article.imageUrl ?? null,
      article.articleUrl ?? null,
      article.isFeatured,
      article.publishedAt,
    ]);
  }
  console.log(JSON.stringify({ success: true, operation: "hostinger_news_upsert", count: articles.length }));
} finally {
  await pool.end();
}
