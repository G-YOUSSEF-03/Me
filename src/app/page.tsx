"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import RedCyberBackground from "@/components/RedCyberBackground";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Mail,
  Monitor,
  Mouse,
  Send,
  Server,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react";

const navItems = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

const techStack: { name: string; icon: LucideIcon; group: string }[] = [
  { name: "Next.js", icon: Code2, group: "Frontend" },
  { name: "React", icon: Sparkles, group: "Frontend" },
  { name: "TypeScript", icon: Terminal, group: "Frontend" },
  { name: "Tailwind CSS", icon: Monitor, group: "Frontend" },
  { name: "Laravel", icon: Code2, group: "Backend" },
  { name: "Node.js", icon: Server, group: "Backend" },
  { name: "MySQL", icon: Database, group: "Database" },
  { name: "Git", icon: GitBranch, group: "Tools" },
  { name: "Docker", icon: Server, group: "DevOps" },
  { name: "SQLite", icon: Database, group: "Database" },
  { name: "JavaScript", icon: Terminal, group: "Frontend" },
  { name: "VS Code", icon: Code2, group: "Tools" },
];

const projects = [
  {
    name: "Score Pack",
    description: "Educational platform for school management and ERP solutions.",
    tags: ["Next.js", "React", "MySQL"],
    mock: "dashboard",
  },
  {
    name: "CasaCar",
    description: "Car rental and booking platform built with modern technologies.",
    tags: ["Next.js", "Laravel", "MySQL"],
    mock: "cars",
  },
  {
    name: "TripPlan",
    description: "Travel planning website with AI recommendations and itineraries.",
    tags: ["Next.js", "TypeScript", "AI"],
    mock: "travel",
  },
  {
    name: "AI Assistant",
    description: "AI-powered assistant for content generation and automation.",
    tags: ["Next.js", "OpenAI", "Tailwind"],
    mock: "assistant",
  },
];

const experiences = [
  {
    period: "2023 - 2024",
    title: "Web Development Internship",
    company: "Score Pack",
    description: "Worked on multiple projects using Next.js, Laravel and MySQL.",
  },
  {
    period: "2022 - 2023",
    title: "Digital Development Student",
    company: "OFPPT",
    description: "Studied full stack development and software engineering.",
  },
  {
    period: "2021 - Present",
    title: "Freelance Developer",
    company: "Independent",
    description: "Working on personal and client projects.",
  },
];

function scrollToSection(label: string) {
  const target = label === "Home" ? "home" : label.toLowerCase();
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [messageSent, setMessageSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessageSent(true);
    event.currentTarget.reset();
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#020202] text-white selection:bg-red-500/40">
      <Navbar />
      <SocialRail />

      <section id="home" className="relative flex min-h-screen w-full items-center overflow-hidden px-6 pb-16 pt-28 md:px-10">
        <RedCyberBackground />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(255,35,45,0.22)]">
              <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_14px_#ff2635]" />
              Available for work
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-normal text-zinc-100 sm:text-7xl lg:text-8xl">
              Hi, I&apos;m
              <br />
              <span className="text-red-500 text-glow">Youssef</span> Elgourari
            </h1>

            <p className="mt-8 max-w-xl text-2xl leading-snug text-zinc-100 sm:text-3xl">
              Full Stack Developer crafting modern digital experiences.
            </p>
            <p className="mt-6 max-w-lg text-base leading-8 text-zinc-300">
              I build fast, scalable and beautiful web applications with modern technologies and clean code.
            </p>

            <div className="mt-9 flex flex-col gap-5 sm:flex-row">
              <button onClick={() => scrollToSection("Projects")} className="red-button">
                View Projects <ArrowRight size={18} />
              </button>
              <button onClick={() => scrollToSection("Contact")} className="glass-button">
                Contact Me <Mail size={17} />
              </button>
            </div>

            <button onClick={() => scrollToSection("About")} className="mt-12 hidden items-center gap-5 text-sm text-zinc-400 md:flex">
              <span className="grid h-9 w-6 place-items-center rounded-full border border-white/40">
                <Mouse size={15} />
              </span>
              Scroll to explore
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="relative z-10 mx-auto w-full max-w-[540px]"
          >
            <CodeCard />
          </motion.div>
        </div>
      </section>

      <section id="about" className="section-shell border-t border-white/10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr]">
          <motion.div className="grid gap-8 md:grid-cols-[1fr_0.8fr]" {...fadeUp}>
            <div>
              <SectionLabel>About Me</SectionLabel>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-white">
                Crafting digital solutions with <span className="text-red-500">passion.</span>
              </h2>
              <p className="mt-6 text-base leading-8 text-zinc-300">
                I&apos;m a Full Stack Developer who loves building modern, scalable and user-friendly web applications. I focus on clean code, performance and great user experiences.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["10+", "Projects Completed"],
                  ["5+", "Technologies Mastered"],
                  ["1+", "Years of Experience"],
                  ["2+", "Internship Experience"],
                ].map(([value, label]) => (
                  <div key={label} className="mini-stat">
                    <Code2 size={16} />
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <PortraitCard />
          </motion.div>

          <motion.div id="skills" {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
            <SectionLabel>My Skills</SectionLabel>
            <div className="mt-5 flex flex-wrap gap-3">
              {["All", "Frontend", "Backend", "Database", "DevOps", "Tools"].map((filter) => (
                <button key={filter} className={filter === "All" ? "filter-pill active" : "filter-pill"}>
                  {filter}
                </button>
              ))}
            </div>
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {techStack.map((tech) => (
                <motion.div key={tech.name} whileHover={{ y: -6 }} className="skill-card">
                  <tech.icon size={22} className="text-red-500 drop-shadow-[0_0_10px_rgba(255,38,53,0.9)]" />
                  <span>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="section-shell border-t border-white/10">
        <div className="mb-7 flex items-center justify-between gap-4">
          <SectionLabel>Featured Projects</SectionLabel>
          <button className="hidden items-center gap-2 text-sm text-zinc-300 hover:text-red-400 sm:flex">
            View all projects <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project, index) => (
            <motion.article key={project.name} {...fadeUp} transition={{ duration: 0.55, delay: index * 0.06 }} whileHover={{ y: -8 }} className="project-card">
              <ProjectMockup variant={project.mock} />
              <div className="mt-5 flex items-start justify-between">
                <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                <ExternalLink size={17} className="text-zinc-600 transition group-hover:text-red-400" />
              </div>
              <p className="mt-3 min-h-14 text-sm leading-6 text-zinc-400">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <a href="https://github.com/youssefelgourari" className="project-link">
                  <GitBranch size={16} /> GitHub
                </a>
                <button className="demo-button">
                  Live Demo <ArrowRight size={15} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="experience" className="section-shell border-t border-white/10">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          <motion.div {...fadeUp}>
            <SectionLabel>Experience</SectionLabel>
            <div className="mt-7 space-y-8 border-l border-red-500/70 pl-8 shadow-[inset_1px_0_0_rgba(255,255,255,0.05)]">
              {experiences.map((item) => (
                <div key={item.title} className="timeline-item">
                  <span className="timeline-dot" />
                  <div className="grid gap-3 sm:grid-cols-[130px_1fr]">
                    <span className="text-base text-zinc-200">{item.period}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {item.title} <span className="text-sm font-bold text-red-500">- {item.company}</span>
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="education-card">
            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <GraduationCap size={20} className="text-red-500" />
                <SectionLabel>Education</SectionLabel>
              </div>
              <h3 className="mt-7 text-xl font-semibold">Technician in Digital Development</h3>
              <p className="mt-3 text-sm text-zinc-300">OFPPT</p>
              <p className="mt-2 text-sm text-zinc-500">2022 - 2024</p>
              <p className="mt-6 max-w-sm text-sm leading-7 text-zinc-400">
                Specialized in web development, databases, and software engineering.
              </p>
            </div>
            <OrbitVisual />
          </motion.div>
        </div>
      </section>

      <section id="contact" className="section-shell">
        <motion.div {...fadeUp} className="contact-card">
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_0.95fr_0.65fr] lg:items-center">
            <div>
              <SectionLabel>Let&apos;s Work Together</SectionLabel>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Let&apos;s build something <span className="text-red-500">amazing</span> together.
              </h2>
              <p className="mt-6 text-base leading-7 text-zinc-300">
                I&apos;m currently available for freelance work and full-time opportunities.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-3">
              <input className="form-field" name="name" placeholder="Your name" required />
              <input className="form-field" name="email" type="email" placeholder="Email address" required />
              <textarea className="form-field min-h-24 resize-none" name="message" placeholder="Project details" required />
              <button className="red-button w-full justify-center" type="submit">
                {messageSent ? "Message Sent" : "Get In Touch"} <Send size={17} />
              </button>
            </form>

            <div className="space-y-4 text-sm text-zinc-200">
              <a className="contact-link" href="mailto:youssefelgourari@gmail.com"><Mail size={18} /> youssefelgourari@gmail.com</a>
              <a className="contact-link" href="https://linkedin.com/in/youssefelgourari"><Briefcase size={18} /> linkedin.com/in/youssefelgourari</a>
              <a className="contact-link" href="https://github.com/youssefelgourari"><GitBranch size={18} /> github.com/youssefelgourari</a>
            </div>
          </div>
          <div className="contact-orbit"><OrbitVisual /></div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/25 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <button onClick={() => scrollToSection("Home")} className="flex items-center gap-4">
          <LogoMark />
          <span className="hidden text-lg font-semibold sm:block">Youssef Elgourari</span>
        </button>
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <button key={item} onClick={() => scrollToSection(item)} className={item === "Home" ? "nav-link active" : "nav-link"}>
              {item}
            </button>
          ))}
        </div>
        <a className="download-button" href="#contact" onClick={(event) => { event.preventDefault(); scrollToSection("Contact"); }}>
          Download CV <Download size={16} />
        </a>
      </nav>
    </header>
  );
}

function SocialRail() {
  const links: { icon: LucideIcon; href: string }[] = [
    { icon: GitBranch, href: "https://github.com/youssefelgourari" },
    { icon: Briefcase, href: "https://linkedin.com/in/youssefelgourari" },
    { icon: Mail, href: "mailto:youssefelgourari@gmail.com" },
  ];

  return (
    <div className="fixed bottom-7 left-6 z-40 hidden flex-col gap-5 md:flex">
      {links.map(({ icon: Icon, href }) => (
        <a key={href} href={href} className="rail-icon">
          <Icon size={17} />
        </a>
      ))}
    </div>
  );
}

function CodeCard() {
  return (
    <div className="code-card">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_12px_#ff2a37]" />
          <span className="h-3 w-3 rounded-full bg-zinc-500" />
          <span className="h-3 w-3 rounded-full bg-zinc-600" />
        </div>
        <span className="text-sm text-zinc-300">portfolio.ts</span>
      </div>
      <pre className="overflow-hidden px-7 py-8 font-mono text-sm leading-7 text-zinc-200 sm:text-base">
        <code>
          <span className="text-red-300">const</span> developer = {"{"}{"\n"}
          {"  "}name: <span className="text-red-400">&apos;Youssef Elgourari&apos;</span>,{"\n"}
          {"  "}role: <span className="text-zinc-100">&apos;Full Stack Developer&apos;</span>,{"\n"}
          {"  "}craft: [<span className="text-red-300">&apos;frontend&apos;</span>, <span className="text-red-300">&apos;backend&apos;</span>, <span className="text-red-300">&apos;ui&apos;</span>],{"\n"}
          {"  "}focus: <span className="text-zinc-100">&apos;premium web experiences&apos;</span>,{"\n"}
          {"  "}status: <span className="text-red-400">&apos;available for work&apos;</span>{"\n"}
          {"}"};{"\n\n"}
          <span className="text-red-300">console</span>.log(developer);
        </code>
      </pre>
      <div className="grid grid-cols-6 gap-3 border-t border-white/10 p-6">
        {[Code2, Sparkles, Server, Terminal, Database, GitBranch].map((Icon, index) => (
          <div key={index} className="tech-cube">
            <Icon size={28} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-black uppercase tracking-[0.22em] text-red-500">{children}</p>;
}

function PortraitCard() {
  return (
    <div className="portrait-card">
      <div className="portrait-ring" />
      <div className="portrait-person">
        <div className="portrait-head" />
        <div className="portrait-body" />
      </div>
      <span className="signature">Youssef</span>
    </div>
  );
}

function ProjectMockup({ variant }: { variant: string }) {
  return (
    <div className={`mockup mockup-${variant}`}>
      <div className="mock-sidebar" />
      <div className="mock-content">
        <span />
        <span />
        <span />
      </div>
      <div className="mock-grid">
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function OrbitVisual() {
  return (
    <div className="orbit-visual">
      <span className="planet" />
      <span className="orbit orbit-one" />
      <span className="orbit orbit-two" />
      <span className="orbit orbit-three" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/10 px-6 py-8 text-sm text-zinc-500 md:flex-row md:px-10">
      <div className="flex items-center gap-8">
        <LogoMark />
        <span>© 2026 Youssef Elgourari. All rights reserved.</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-7">
        {navItems.map((item) => (
          <button key={item} onClick={() => scrollToSection(item)} className="hover:text-red-400">
            {item}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <a className="footer-icon" href="https://github.com/youssefelgourari"><GitBranch size={17} /></a>
        <a className="footer-icon" href="https://linkedin.com/in/youssefelgourari"><Briefcase size={17} /></a>
        <a className="footer-icon" href="mailto:youssefelgourari@gmail.com"><Mail size={17} /></a>
        <button onClick={() => scrollToSection("Home")} className="footer-icon red-top"><ArrowRight size={18} /></button>
      </div>
    </footer>
  );
}

function LogoMark() {
  return (
    <span className="relative grid h-9 w-10 place-items-center text-3xl font-black tracking-tighter text-red-500 text-glow">
      YE
    </span>
  );
}
