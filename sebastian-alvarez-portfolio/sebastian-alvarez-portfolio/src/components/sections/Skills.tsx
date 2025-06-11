'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      name: 'Frontend',
      skills: ['JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
    },
    {
      name: 'Backend',
      skills: ['Node.js', 'Express.js', 'Python', 'Flask', 'REST APIs', 'GraphQL'],
    },
    {
      name: 'Databases',
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'],
    },
    {
      name: 'DevOps & Tools',
      skills: ['Docker', 'Git & GitHub', 'CI/CD', 'AWS (EC2, S3)', 'Vercel', 'Webpack'],
    },
  ];

  return (
    <section id="skills" className="py-12 bg-background-light">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-text-default mb-10">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => ( // Added index here
            <motion.div
              key={category.name}
              className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-text-default mb-4">{category.name}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-text-default flex items-center">
                    <svg className="w-4 h-4 mr-2 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
