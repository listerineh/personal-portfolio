'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Blog: React.FC = () => {
  const posts = [
    {
      title: 'Understanding React Hooks',
      excerpt: 'A deep dive into how React Hooks work and how they can simplify your component logic. Learn about useState, useEffect, and more.',
      slug: '#', // Placeholder for link to full post
    },
    {
      title: 'Getting Started with Next.js 14',
      excerpt: 'Explore the new features in Next.js 14, including Server Actions and improved performance optimizations for modern web development.',
      slug: '#',
    },
    {
      title: 'Tailwind CSS Best Practices',
      excerpt: 'Discover tips and tricks for writing maintainable and scalable Tailwind CSS code, from utility-first principles to custom configurations.',
      slug: '#',
    },
  ];

  return (
    <section id="blog" className="py-12 bg-background-light">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-text-default mb-10">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5, boxShadow: "0px 8px 16px rgba(0,0,0,0.08)" }}
            >
              <h3 className="text-xl font-semibold text-text-default mb-3">{post.title}</h3>
              <p className="text-text-muted text-sm mb-4 flex-grow">{post.excerpt}</p>
              <a
                href={post.slug}
                className="inline-block mt-auto text-primary hover:text-primary-dark font-medium transition-colors duration-200 self-start"
              >
                Read More &rarr;
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
