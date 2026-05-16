import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BASE_URL = "https://byti-technologie.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/a-propos", changefreq: "monthly", priority: "0.7" },
          { path: "/activites", changefreq: "monthly", priority: "0.7" },
          { path: "/electronique", changefreq: "monthly", priority: "0.8" },
          { path: "/securite", changefreq: "monthly", priority: "0.8" },
          { path: "/batteries", changefreq: "monthly", priority: "0.8" },
          { path: "/televiseurs", changefreq: "monthly", priority: "0.8" },
          { path: "/btp", changefreq: "monthly", priority: "0.8" },
          { path: "/projets", changefreq: "monthly", priority: "0.7" },
          { path: "/boutique", changefreq: "weekly", priority: "0.8" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" },
        ];

        try {
          const { data: products } = await supabaseAdmin
            .from("products")
            .select("id, updated_at")
            .limit(1000);
          if (products) {
            for (const p of products) {
              entries.push({
                path: `/produit/${p.id}`,
                changefreq: "weekly",
                priority: "0.6",
                lastmod: p.updated_at ?? undefined,
              });
            }
          }
        } catch {
          // ignore — sitemap still serves the static routes
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
