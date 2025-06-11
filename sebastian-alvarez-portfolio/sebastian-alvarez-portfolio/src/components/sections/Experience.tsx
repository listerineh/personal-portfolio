'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      dates: 'Jan 2021 - Present',
      description: 'Led development of scalable web applications using React, Node.js, and cloud services. Mentored junior developers and contributed to architectural decisions.',
    },
    {
      title: 'Software Developer',
      company: 'Innovatech Ltd.',
      dates: 'Jun 2018 - Dec 2020',
      description: 'Developed and maintained features for a SaaS platform. Worked collaboratively in an Agile environment to deliver high-quality software.',
    },
    {
      title: 'Junior Developer',
      company: 'Web Wizards Co.',
      dates: 'Jul 2017 - May 2018',
      description: 'Assisted in the development of client websites and internal tools, focusing on front-end technologies and learning best practices.',
    }
  ];

  return (
    <section id="experience" className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-text-default mb-8">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="bg-background-light p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold text-text-default">{exp.title}</h3>
              <p className="text-md text-primary font-medium">{exp.company}</p>
              <p className="text-sm text-text-muted mb-2">{exp.dates}</p>
              <p className="text-text-default">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
