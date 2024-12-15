"use client";

import { useState, useEffect, use } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Blog } from "@/types";

export default function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const id = use(params).id
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        const data = await response.json();
        setBlog(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div className="px-4 py-8 animate-pulse">
        <div className="h-12 w-3/4 bg-muted rounded mb-4" />
        <div className="flex gap-4 mb-8">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
        <div className="h-6 w-full bg-muted rounded mb-8" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-muted rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="px-4 py-8">
        <p className="text-xl text-muted-foreground">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        {blog.title}
      </h1>
      <div className="flex items-center gap-4 mb-8">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>{blog.author}</span>
          <time>{blog.publishedAt}</time>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsLiked(!isLiked)}
          className={isLiked ? "text-red-500" : ""}
        >
          <Heart className={isLiked ? "fill-current" : ""} />
        </Button>
      </div>
      <p className="text-xl text-muted-foreground mb-8">
        {blog.description}
      </p>
    </div>
  );
}
