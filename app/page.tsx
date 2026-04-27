import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { db } from '@/lib/db';

export default async function Home() {
  const blogPosts = await db.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Hi, Im Franz</h1>
        <p className="text-muted-foreground text-lg max-w-md mb-6">
          A full-staack developer passionate about building scalable and
          user-friendly applications.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/blog">Read Blog</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/comments">
              <MessageCircle className="w-4 h-4 hr-2" />
              Contact Me
            </Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-muted-foreground">
          I specialize in React, Next JS, and TypeScript. With years of
          experience building acalable applications, I love turning ideas into
          reality.
        </p>
      </section>

      {/* Recent Post Section */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Recent Post</h2>
        {blogPosts.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="hover:bg-accent transitions-colors"
              >
                <Link href={`/blog/${post.slug}`}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="">
            <p>No post foound..</p>
          </div>
        )}

        <Button asChild variant="link" className="mt-4 px-0">
          <Link href="/blog">
            View all posts <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </section>
    </main>
  );
}
