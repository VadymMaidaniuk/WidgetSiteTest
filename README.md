# Atlas Widget Docs

A simple multi-page site for testing RAG parsers. The project is built as a static `Next.js` frontend with no backend dependencies, so it can be fully deployed to Vercel.

## What's inside

- 8 pages with different content types: paragraphs, lists, tables, and breadcrumb navigation.
- Fictional but stable facts: device models, API limits, data retention periods, and contacts.
- Internal links between pages to test crawl depth and retrieval relevance.
- `sitemap.xml` and `robots.txt` via App Router.

Main pages:

- `/`
- `/about`
- `/catalog`
- `/guides/installation`
- `/guides/integrations`
- `/policies/data-retention`
- `/faq`
- `/contact`

## Local run

```bash
cd frontend
npm install
npm run dev
```

After startup, the site will be available at `http://localhost:3000`.

## Deploy to Vercel

1. Push the repository to GitHub.
2. Connect the repository in Vercel.
3. Set `frontend` as the `Root Directory`.
4. Keep the default build command: `npm run build`.
5. Optionally add `NEXT_PUBLIC_SITE_URL` so `sitemap.xml` and `robots.txt` use your production URL.

## What this site is useful for

- Verifying that a parser correctly crawls internal links.
- Testing extraction of tables and numeric facts.
- Testing grounding against policy pages and FAQ.
- Comparing answers to questions like:
  - "How many days are sensor readings retained on Basic?"
  - "At what time is the CSV export generated?"
  - "How many devices can be connected to one gateway?"
  - "What is the support email address?"

## Repository note

Legacy files from an older project version may still remain in the repository. Only the `frontend` folder is used for the current site and Vercel deployment.
