import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BLOG_POSTS } from "@/data/blog.data";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/utils/format";

export function BlogListPage() {
  return (
    <Container className="pt-7 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Blog" }]} />
      <SectionHeader eyebrow="The journal" title="Notes on collecting" sub="Guides, studio visits and practical advice for living with art." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map((p) => (
          <Link key={p.slug} to={ROUTES.blogPost(p.slug)} className="card block overflow-hidden border border-line">
            <div className="aspect-[16/10] bg-line">
              <img src={`https://picsum.photos/seed/${p.slug}/500/320`} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <div className="font-mono text-[10.5px] text-ink-faint mb-2">{formatDate(p.date)}</div>
              <div className="font-serif text-[19px] mb-2 leading-tight">{p.title}</div>
              <p className="text-[13px] text-ink-soft leading-relaxed mb-2.5">{p.excerpt}</p>
              <span className="underline-link">
                Read more <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
