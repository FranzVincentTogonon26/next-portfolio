import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default async function BlogPage() {
  const blogPosts = await db.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="size-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <h2 className="text-2xl font-bold mb-4">Recent Post</h2>
        {blogPosts.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:bg-accent transition-colors">
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
      </div>
    </main>
  );
}
