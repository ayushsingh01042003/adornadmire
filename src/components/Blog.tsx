import React from 'react';

interface BlogPostProps {
  image: string;
  title: string;
  excerpt: string;
  url: string;
  author: string;
  comments: number;
}

const BlogPost: React.FC<BlogPostProps> = ({ image, title, excerpt, url, author, comments }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <a href={url} className="block overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
        />
      </a>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-primary mb-2">
          <a href={url} className="hover:text-accent transition-colors">
            {title}
          </a>
        </h3>
        <div className="text-gray-500 text-sm mb-3">
          <span>{author}</span>
          <span className="mx-2">·</span>
          <span>{comments} Comments</span>
        </div>
        <p className="text-gray-700 mb-4">{excerpt}</p>
        <a
          href={url}
          className="text-accent hover:text-primary transition-colors font-medium inline-flex items-center"
        >
          Read More <span className="ml-1">→</span>
        </a>
      </div>
    </div>
  );
};

const Blog = () => {
  const blogPosts = [
    {
      image: 'https://ext.same-assets.com/3541422158/4192299834.jpeg',
      title: 'What are the Benefits of Regular Body Massage?',
      excerpt: 'Introduction: In the hustle and bustle of modern life, finding moments of tranquility and relaxation can seem like a distant...',
      url: '#',
      author: 'Adorn',
      comments: 0,
    },
    {
      image: 'https://ext.same-assets.com/3541422158/4003102453.jpeg',
      title: 'Transform Your Look with Our Signature Haircut Services',
      excerpt: 'Introduction: In a world where personal style speaks volumes about who we are, a great haircut can be the ultimate...',
      url: '#',
      author: 'Adorn',
      comments: 0,
    },
    {
      image: 'https://ext.same-assets.com/3541422158/1007345690.jpeg',
      title: 'What Are the Benefits of Hair Smoothening?',
      excerpt: 'Introduction: Are you dreaming of waking up with glossy, silky looks without the hassle of straightening or blow-drying? Hair smoothening...',
      url: '#',
      author: 'Adorn',
      comments: 0,
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Blog</h2>
          <h3 className="section-subtitle">Our Latest News & Blog</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogPost
              key={index}
              image={post.image}
              title={post.title}
              excerpt={post.excerpt}
              url={post.url}
              author={post.author}
              comments={post.comments}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
