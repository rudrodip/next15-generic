import Link from "next/link";
import { Suspense } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { type Blog } from "@/types";

function BlogSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
        <div className="h-4 w-full bg-muted animate-pulse rounded mt-2" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm">
          <div className="h-4 w-20 bg-muted animate-pulse rounded" />
          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

function BlogLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <BlogSkeleton key={i} />
      ))}
    </div>
  );
}

function BlogGrid({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Link 
          key={blog.id}
          href={`/blogs/${blog.id}`}
          className="transition-colors hover:opacity-80"
        >
          <Card>
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
              <CardDescription>{blog.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{blog.author}</span>
                <time>{blog.publishedAt}</time>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default async function BlogsPage() {
  const blogsResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blogs`);

  const blogs = await blogsResponse.json();

  return (
    <div>
      <div className="px-4 py-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
          Blog Posts
        </h1>
        <Suspense fallback={<BlogLoading />}>
          <BlogGrid blogs={blogs} />
        </Suspense>
      </div>
    </div>
  );
}
