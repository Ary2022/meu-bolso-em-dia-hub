import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" as const },
  { path: "/dicas", priority: "0.9", changefreq: "weekly" as const },
  { path: "/livros", priority: "0.9", changefreq: "weekly" as const },
  { path: "/renda-extra", priority: "0.8", changefreq: "monthly" as const },
  { path: "/patrocinadores", priority: "0.6", changefreq: "monthly" as const },
  { path: "/sobre", priority: "0.5", changefreq: "yearly" as const },
  { path: "/contato", priority: "0.5", changefreq: "yearly" as const },
  { path: "/faq", priority: "0.5", changefreq: "monthly" as const },
  { path: "/privacidade", priority: "0.3", changefreq: "yearly" as const },
  { path: "/termos", priority: "0.3", changefreq: "yearly" as const },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = ROUTES.map(r => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
