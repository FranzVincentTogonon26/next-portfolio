import { db } from '@/lib/db';

async function main() {
  const blogPosts = [
    {
      slug: 'getting-started-with-prisma',
      title: 'Getting Started with Prisma',
      content: `
                # Getting Started with Prisma
                    Prisma is a modern ORM that makes database access easy and type-safe.
                
                ## Why Use Prisma
                    - Type-safe queries
                    - Easy migrations
                    - Works well with PostgreSQL, MySQL, and more
                    
                **Tips:** Always run migrations after updating your schema.`,
    },
    {
      slug: 'introduction-to-typescript',
      title: 'Introduction to TypeScript',
      content: `
                # Introduction to TypeScript
                    TypeScript is a superset of JavaScript that adds static typing.
                
                ## Benefits of TypeScript
                    - Better code quality
                    - Early error detection
                    - Improved IDE support
                    
                **Tips:** Start by converting small projects from JS to TS.`,
    },
    {
      slug: 'building-rest-api-nodejs',
      title: 'Building a REST API with Node.js',
      content: `
                # Building a REST API with Node.js
                    Node.js allows you to build scalable backend services using JavaScript.
                
                ## Key Concepts
                    - Routing
                    - Middleware
                    - Request and response handling
                    
                **Tips:** Use Express.js for faster development.`,
    },
    {
      slug: 'css-flexbox-guide',
      title: 'CSS Flexbox Guide',
      content: `
                # CSS Flexbox Guide
                    Flexbox is a layout system that helps you design flexible and responsive layouts.
                
                ## Key Properties
                    - display: flex
                    - justify-content
                    - align-items
                    
                **Tips:** Use Flexbox for one-dimensional layouts.`,
    },
    {
      slug: 'introduction-to-git',
      title: 'Introduction to Git',
      content: `
                # Introduction to Git
                    Git is a version control system used to track changes in code.
                
                ## Basic Commands
                    - git init
                    - git add
                    - git commit
                    
                **Tips:** Commit often with meaningful messages.`,
    },
  ];

  for (const post of blogPosts) {
    await db.blogPost.upsert({
      where: { slug: post.slug },
      update: { title: post.title, content: post.content },
      create: post,
    });
  }
}

main()
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
