'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink, GitBranch as GithubIcon, Link as LinkedinIcon, Mail, Menu, X } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { fetchPortfolioData, PortfolioData } from '../lib/dataService';
import { config } from '../lib/config';

// Example usage of environment variables:
// - config.app.env: current environment (development/production)
// - config.analytics.enabled: whether analytics should be loaded
// - config.features.emailContact: whether to show email contact form

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    fetchPortfolioData()
      .then(setData)
      .catch((error) => {
        console.error('Failed to load portfolio data', error);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      const headerHeight = document.querySelector('header')?.clientHeight ?? 112;
      const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];
      if (sections.length === 0) return;

      const scrollMarker = scrollTop + headerHeight + 64;
      let currentSectionId = sections[0].id;
      for (const section of sections) {
        if (scrollMarker >= section.offsetTop) {
          currentSectionId = section.id;
        } else {
          break;
        }
      }
      setActiveSection(currentSectionId);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-gray-400 px-6">
        <div className="mb-6 h-16 w-16 rounded-full border-4 border-t-4 border-white/10 border-t-emerald-400 animate-spin" />
        <p className="text-sm uppercase tracking-[0.35em] text-gray-400">Loading portfolio...</p>
      </div>
    );
  }

  const { header, hero, about, skills, experience, projects, publications, openSource, contact, footer, ui } = data;

  return (
    <div className="min-h-screen text-white bg-[#0a0a0a]">
      <motion.header
        className="fixed inset-x-0 top-0 z-50 border-b border-gray-800 bg-black/70 backdrop-blur-md"
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="h-1 overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-500"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-6 py-4">
          <div className="text-xl font-bold mono tracking-[0.18em]">{header.title}</div>
          <div className="hidden items-center gap-4 text-sm font-medium md:flex">
            {header.navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${
                    isActive ? 'text-white border-b-2 border-emerald-400' : 'text-gray-400 hover:text-gray-200'
                  } py-1`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-gray-800 bg-white/5 p-3 text-gray-300 transition hover:bg-white/10 md:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? ui.menuOpen : ui.menuClosed}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen && (
          <div className="bg-black/95 border-t border-gray-800 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm font-medium">
              {header.navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`rounded-3xl border border-gray-800 bg-white/5 px-4 py-3 transition ${
                      isActive ? 'border-emerald-400 text-white' : 'hover:border-green-400 hover:text-white text-gray-300'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </motion.header>

      <main className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.14),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.10),_transparent_24%)] pointer-events-none" />

        <section className="min-h-screen flex items-center justify-center px-6 pb-20">
          <div className="relative w-full max-w-5xl">
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-[36px] border border-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            />

            <motion.div
              className="relative rounded-[32px] border border-gray-800 bg-black/85 p-8 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg mono uppercase text-gray-400 mb-3">{ui.systemStatusLabel}</p>
                  <div className="text-sm uppercase tracking-[0.35em] text-green-400/80">{ui.systemStatusDescription}</div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-950/80 px-4 py-2 text-xs text-green-400 mono">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  {hero.status}
                  {config.app.env === 'development' && (
                    <span className="ml-2 text-xs text-yellow-400">[DEV]</span>
                  )}
                </div>
              </div>

              <motion.h1
                className="text-4xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-5xl md:text-6xl"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              >
                {hero.headline.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-2"
                    variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                className="mt-8 max-w-2xl text-base leading-8 text-gray-300 md:text-lg"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                {hero.subheading}
              </motion.p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <motion.a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-full border border-gray-700 bg-white/5 px-6 py-3 text-sm font-semibold transition hover:border-green-400 hover:text-white"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  {hero.cta}
                </motion.a>
                <motion.a
                  href="#about"
                  className="text-sm text-gray-400 mono hover:text-white"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.75 }}
                >
                  {hero.scroll} <ChevronDown className="inline-block ml-2" size={18} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="scroll-mt-28 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <p className="text-sm mono uppercase tracking-[0.35em] text-green-400 mb-4">{ui.sectionTitles.about}</p>
              <h2 className="text-3xl font-bold md:text-4xl">{about.heading}</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
              <motion.div
                className="rounded-[32px] border border-gray-800 bg-[#0f0f0f]/95 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">{about.description}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {about.highlights.map((item) => (
                    <div key={item.label} className="rounded-3xl border border-gray-800 bg-white/5 p-5">
                      <p className="text-xs text-green-400 mono uppercase tracking-[0.35em] mb-2">{item.label}</p>
                      <p className="text-sm text-gray-300">{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="rounded-[32px] border border-gray-800 bg-gradient-to-br from-white/5 via-transparent to-black/40 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <span className="text-sm mono uppercase tracking-[0.35em] text-green-400">{ui.coreCapabilitiesTitle}</span>
                <ul className="mt-8 grid gap-4 text-gray-300 text-sm">
                  {about.capabilities.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-green-400" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-28 py-20 px-6 bg-[#090909]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <p className="text-sm mono uppercase tracking-[0.35em] text-green-400 mb-4">{ui.sectionTitles.skills}</p>
              <h2 className="text-3xl font-bold md:text-4xl">{ui.sectionSubtitles.skills}</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {skills.map((block) => (
                <motion.div
                  key={block.title}
                  className="rounded-[30px] border border-gray-800 bg-black/80 p-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-xl font-semibold mb-6">{block.title}</h3>
                  <div className="space-y-3">
                    {block.items.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-3xl border border-gray-800 bg-white/5 px-4 py-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-green-400" />
                        <span className="text-sm text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="scroll-mt-28 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <p className="text-sm mono uppercase tracking-[0.35em] text-green-400 mb-4">{ui.sectionTitles.experience}</p>
              <h2 className="text-3xl font-bold md:text-4xl">{ui.sectionSubtitles.experience}</h2>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-white/10" />

              <div className="space-y-10">
                {experience.map((item, index) => {
                  const isEven = index % 2 === 0;
                  const card = (
                    <div className="rounded-[32px] border border-gray-800 bg-[#111111]/95 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
                      <div className="flex flex-col gap-2">
                        <p className="text-xs text-green-400 mono uppercase tracking-[0.35em]">{item.period}</p>
                        <h3 className="text-xl font-semibold mt-3">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.company}</p>
                      </div>
                      <span className="mt-4 inline-flex rounded-full border border-gray-800 bg-white/5 px-4 py-2 text-xs mono uppercase tracking-[0.3em] text-gray-300">
                        {ui.enterpriseTag}
                      </span>
                      <ul className="mt-6 space-y-3 text-gray-300 text-sm">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-green-400" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );

                  return (
                    <motion.div
                      key={item.title}
                      className="relative lg:grid lg:grid-cols-[1fr_64px_1fr] lg:items-center"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                    >
                      <div className={`hidden lg:block ${isEven ? 'lg:pr-8' : ''}`}>
                        {isEven ? card : null}
                      </div>

                      <div className="hidden lg:flex relative justify-center items-center lg:col-start-2">
                        <div className="absolute inset-y-0 w-px bg-white/10" />
                        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400 bg-[#0a0a0a]">
                          <span className="h-3 w-3 rounded-full bg-emerald-400" />
                        </div>
                      </div>

                      <div className={`hidden lg:block ${!isEven ? 'lg:pl-8' : ''}`}>
                        {!isEven ? card : null}
                      </div>

                      <div className="lg:hidden">
                        <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <span className="h-10 w-0.5 rounded-full bg-white/10" />
                            <span className="mt-2 h-4 w-4 rounded-full border border-emerald-400 bg-[#0a0a0a] hidden" />
                            <span className="mt-2 flex-1 w-px bg-white/10" />
                          </div>
                          <div className="flex-1">{card}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-28 py-20 px-6 bg-[#090909]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <p className="text-sm mono uppercase tracking-[0.35em] text-green-400 mb-4">{ui.sectionTitles.projects}</p>
              <h2 className="text-3xl font-bold md:text-4xl">{ui.sectionSubtitles.projects}</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {projects.map((project, index) => (
                <motion.div
                  key={project.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="publications" className="scroll-mt-28 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <p className="text-sm mono uppercase tracking-[0.35em] text-green-400 mb-4">{ui.sectionTitles.publications}</p>
              <h2 className="text-3xl font-bold md:text-4xl">{ui.sectionSubtitles.publications}</h2>
            </div>

            <div className="grid gap-4">
              {publications.map((item, index) => (
                <motion.a
                  key={item.title}
                  href="#"
                  className="group rounded-[28px] border border-gray-800 bg-black/80 p-6 transition hover:border-green-400"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-base font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.source}</p>
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs text-green-400 mono uppercase tracking-[0.35em]">
                      <ExternalLink size={14} />
                      <span>{item.year}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section id="oss" className="scroll-mt-28 py-20 px-6 bg-[#090909]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <p className="text-sm mono uppercase tracking-[0.35em] text-green-400 mb-4">{ui.sectionTitles.openSource}</p>
              <h2 className="text-3xl font-bold md:text-4xl">{ui.sectionSubtitles.openSource}</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {openSource.map((item, index) => (
                <motion.a
                  key={item.repo}
                  href={item.link}
                  className="group rounded-[28px] border border-gray-800 bg-black/80 p-6 transition hover:border-green-400"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold">{item.repo}</p>
                      <p className="mt-2 text-sm text-gray-400">{item.contribution}</p>
                    </div>
                    <ExternalLink size={18} className="text-green-400 transition group-hover:translate-x-1" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <p className="text-sm mono uppercase tracking-[0.35em] text-green-400 mb-4">{ui.sectionTitles.contact}</p>
              <h2 className="text-3xl font-bold md:text-4xl">{contact.heading}</h2>
            </div>

            <motion.div
              className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-[32px] border border-gray-800 bg-black/80 p-8">
                <p className="text-gray-300 leading-relaxed">{contact.intro}</p>
                <div className="mt-8 space-y-4 text-sm text-gray-300">
                  {contact.details.map((item) => (
                    <div key={item.label} className="rounded-3xl border border-gray-800 bg-white/5 p-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs text-green-400 mono uppercase tracking-[0.35em] mb-2">{item.label}</p>
                        <a href={item.href} className="text-gray-100 hover:text-white">{item.value}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-gray-800 bg-white/5 p-8 text-gray-300">
                <p className="text-sm mono uppercase tracking-[0.35em] text-green-400 mb-4">{ui.quickFacts}</p>
                <div className="space-y-5">
                  {contact.facts.map((item) => (
                    <div key={item.label} className="flex flex-col gap-2 rounded-3xl border border-gray-800 bg-black/80 p-4">
                      <span className="text-xs text-green-400 mono uppercase tracking-[0.35em]">{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-12 px-6 bg-[#090909]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-green-400 mono uppercase tracking-[0.35em] mb-2">{ui.footerLabel}</p>
            <p className="text-gray-400 text-sm">{footer.note}</p>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-gray-400">
            {footer.links.map((link) => (
              <a key={link.label} href={link.href} className="inline-flex items-center gap-2 hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
