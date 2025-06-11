'use client';
import React from 'react';
import Image from 'next/image'; // Using next/image for optimized images
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with user authentication, product listings, cart functionality, and payment integration.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Stripe API'],
      imageUrl: 'https://via.placeholder.com/300x200/007bff/ffffff?Text=ProjectAlpha',
      liveLink: '#', // Placeholder
      repoLink: '#', // Placeholder
    },
    {
      title: 'Portfolio Website',
      description: 'A personal portfolio website to showcase my skills and projects, built with a modern tech stack and responsive design.',
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
      imageUrl: 'https://via.placeholder.com/300x200/28a745/ffffff?Text=ProjectBeta',
      liveLink: '#',
      repoLink: '#',
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application that allows users to create, assign, and track tasks within teams.',
      technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Socket.io'],
      imageUrl: 'https://via.placeholder.com/300x200/dc3545/ffffff?Text=ProjectGamma',
      liveLink: '#',
      repoLink: '#',
    },
  ];

  return (
    <section id="projects" className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-text-default mb-10">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-background-light rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
            >
              <div className="relative w-full h-48"> {/* Fixed height container for image */}
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  layout="fill" // Makes image fill the container
                  objectFit="cover" // Ensures image covers the area, might crop
                  className="transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-text-default mb-2">{project.title}</h3>
                <p className="text-text-muted text-sm mb-3 flex-grow">{project.description}</p>
                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-text-default mb-1">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="bg-secondary text-text-light px-2 py-1 text-xs font-medium rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto flex space-x-3">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary hover:bg-primary-dark text-text-light py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-secondary hover:bg-secondary-light text-text-light py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
