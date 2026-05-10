'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../lib/config';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  form: {
    heading: string;
    subheading: string;
    submitButton: string;
    successMessage: string;
    errorMessage: string;
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      subject: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
  };
}

export default function ContactForm({ form }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const apiBaseUrl = config.api.apiUrl ;

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact details');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      showToast('Contact submitted successfully.');

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      showToast('Contact submission failed. Please try again.');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="reveal"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{form.heading}</h2>
          <p className="text-gray-400 text-lg">{form.subheading}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              {form.fields.name.label}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={form.fields.name.placeholder}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-800 text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50 transition-all"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              {form.fields.email.label}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={form.fields.email.placeholder}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-800 text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50 transition-all"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
              {form.fields.subject.label}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder={form.fields.subject.placeholder}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-800 text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50 transition-all"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              {form.fields.message.label}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={form.fields.message.placeholder}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-800 text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50 transition-all resize-none"
            />
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-emerald-400/10 border border-emerald-400/50 text-emerald-400"
            >
              {form.successMessage}
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-red-400/10 border border-red-400/50 text-red-400"
            >
              {form.errorMessage}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-4 rounded-lg bg-emerald-400 text-black font-bold uppercase tracking-wider hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? 'Sending...' : form.submitButton}
          </motion.button>
        </form>
      </div>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-white/10 bg-black/90 px-4 py-3 text-sm text-white shadow-xl">
          {toastMessage}
        </div>
      )}
    </motion.div>
  );
}
