import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

import AuthButton from '@/components/auth-button';
import { db } from '@/lib/db';
import CommentForm from '@/components/comment-form';
import CommentList from '@/components/comments-list';

export default async function CommentPage() {
  const comments = await db.comments.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/">
            <ArrowLeft className="size-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-2">Comments</h1>
        <p className="text-muted-foreground mb-8">
          Sign in with Github to leave a comment or message.
        </p>

        <div className="mb-8">
          <AuthButton />
        </div>

        <CommentForm />

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">
            All Comments ({comments.length})
          </h2>
          <CommentList comments={comments} />
        </div>
      </div>
    </main>
  );
}
