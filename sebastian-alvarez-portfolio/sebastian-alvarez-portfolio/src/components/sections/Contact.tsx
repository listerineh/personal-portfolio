'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <motion.section
      id="contact"
      className="py-12 bg-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-text-default mb-10">Contact Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Contact Form Placeholder */}
          <div className="bg-background-light p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-text-default mb-6">Send a Message</h3>
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-default">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  className="mt-1 block w-full px-3 py-2 border border-text-muted opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-default">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  className="mt-1 block w-full px-3 py-2 border border-text-muted opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-default">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="Your message..."
                  className="mt-1 block w-full px-3 py-2 border border-text-muted opacity-50 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                ></textarea>
              </div>
              <div>
                <motion.button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-text-light bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-background-light p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-text-default mb-6">Get in Touch</h3>
            <p className="text-text-default mb-4">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing. Feel free to reach out!
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-text-default">Email</h4>
                <a href="mailto:sebastian.alvarez@example.com" className="text-secondary hover:text-secondary-light transition-colors duration-200">
                  sebastian.alvarez@example.com
                </a>
              </div>
              <div>
                <h4 className="font-semibold text-text-default">LinkedIn</h4>
                <a
                  href="https://www.linkedin.com/in/yourprofile" // Replace with actual LinkedIn profile
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-secondary-light transition-colors duration-200"
                >
                  linkedin.com/in/yourprofile
                </a>
              </div>
              <div>
                <h4 className="font-semibold text-text-default">Location</h4>
                <p className="text-text-default">Medellin, Colombia (Open to remote)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
