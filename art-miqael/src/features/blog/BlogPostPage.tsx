import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { findBlogPost, BLOG_POSTS } from "@/data/blog.data";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/utils/format";

export function BlogPostPage() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const post = findBlogPost(slug);

  if (!post) {
    return (
      <Container className="pt-10">
        <EmptyState icon={AlertCircle} title="Post not found" body="" action={<Button onClick={() => navigate(ROUTES.blog)}>Back to blog</Button>} />
      </Container>
    );
  }

  const more = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <Container className="pt-7 pb-16 max-w-[760px]">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Blog", to: ROUTES.blog }, { label: post.title }]} />
      <div className="font-mono text-[11px] text-ink-faint mt-5 mb-2.5">
        {formatDate(post.date, { month: "long", day: "numeric", year: "numeric" })} · {post.author}
      </div>
      <h1 className="heading-serif text-[clamp(28px,4vw,40px)] mb-5.5">{post.title}</h1>
      <div className="rounded-lg overflow-hidden mb-7">
        <img src={`https://picsum.photos/seed/${post.slug}/900/500`} alt="" className="w-full aspect-[16/9] object-cover" />
      </div>
      {post.body.map((para, i) => (
        <p key={i} className="text-[15.5px] leading-[1.85] text-ink-soft mb-4.5">
          {para}
        </p>
      ))}
      <hr className="border-line my-9" />
      <div className="font-mono text-[11px] text-ink-faint mb-4">MORE FROM THE JOURNAL</div>
      <div className="grid gap-2.5">
        {more.map((p) => (
          <Link key={p.slug} to={ROUTES.blogPost(p.slug)} className="underline-link">
            {p.title} <ArrowRight size={12} className="inline" />
          </Link>
        ))}
      </div>
    </Container>
  );
}
