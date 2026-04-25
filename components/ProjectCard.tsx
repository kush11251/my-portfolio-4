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
      className="relative border border-gray-800 rounded-3xl overflow-hidden cursor-pointer group bg-[#111111]/80 backdrop-blur hover-lift expand-line"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Image background */}
      {image && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-0 blur-md"
          style={{ backgroundImage: `url(${image})` }}
          animate={{ opacity: isHovered ? 0.08 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div>
          <motion.div
            className="inline-block text-4xl font-bold text-gray-500 mb-6 mono"
            animate={{ color: isHovered ? '#10b981' : '#6b7280' }}
            transition={{ duration: 0.3 }}
          >
            {number}
          </motion.div>
          <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">{title}</h3>
          <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-6 flex items-center gap-2"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-emerald-400 font-semibold text-sm">Explore →</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
