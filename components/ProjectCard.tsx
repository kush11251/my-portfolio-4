'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProjectCardProps {
  number: string;
  title: string;
  description: string;
  image?: string;
}

export default function ProjectCard({ number, title, description, image }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative border border-gray-800 p-6 rounded-lg overflow-hidden cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {image && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-0 blur-sm"
          style={{ backgroundImage: `url(${image})` }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <div className="relative z-10">
        <div className="text-4xl font-bold text-gray-400 mb-4 mono">{number}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
}