import { Experience, Project, SkillNode, Achievement, Testimonial } from "./types";
import { Code2, Database, Layout, PenTool, Server, Box, Cpu, Globe } from 'lucide-react';
import React from 'react';

export const DEV_NAME = "Arya Stark";
export const DEV_TITLE = "Architect of Digital Realms";

export const NAVIGATION_ITEMS = [
  { id: 'CITADEL', label: 'The Citadel' },
  { id: 'QUEST_LOG', label: 'Quest Log' },
  { id: 'ARSENAL', label: 'The Arsenal' },
  { id: 'GUILD_HALL', label: 'Guild Hall' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: "Mystic Market",
    description: "A high-performance e-commerce dashboard for trading magical artifacts. Features real-time inventory tracking and dark-mode analytics.",
    techStack: ["React", "TypeScript", "Tailwind", "Recharts"],
    imageUrl: "https://picsum.photos/800/600?random=1",
    demoUrl: "#",
    repoUrl: "#",
    category: "Fullstack",
    status: "Critical Success"
  },
  {
    id: '2',
    title: "Grimoire CMS",
    description: "A headless content management system designed for writers of eldritch horror. Markdown support with live preview.",
    techStack: ["Next.js", "GraphQL", "Node.js"],
    imageUrl: "https://picsum.photos/800/600?random=2",
    demoUrl: "#",
    repoUrl: "#",
    category: "Frontend",
    status: "Completed Quest"
  },
  {
    id: '3',
    title: "Aether Chat",
    description: "Real-time communication platform using WebSockets. Encrypted whispering included.",
    techStack: ["Vue", "Firebase", "SCSS"],
    imageUrl: "https://picsum.photos/800/600?random=3",
    demoUrl: "#",
    repoUrl: "#",
    category: "Frontend",
    status: "In-Progress Quest"
  },
  {
    id: '4',
    title: "Rune Scryer",
    description: "Data visualization tool for analyzing complex datasets. Uses D3.js to render interactive constellations.",
    techStack: ["D3.js", "React", "Python"],
    imageUrl: "https://picsum.photos/800/600?random=4",
    demoUrl: "#",
    repoUrl: "#",
    category: "UI/UX",
    status: "Completed Quest"
  }
];

// Replaces the old linear SKILLS list
export const SKILL_TREE: SkillNode[] = [
  // Root
  { 
    id: 'js', name: "JavaScript (ES6+)", level: 95, 
    description: "The core language of the realm. Mastery allows for manipulation of the DOM and asynchronous sorcery.",
    icon: React.createElement(Code2), category: 'core', x: 50, y: 10 
  },
  // Branch 1 - Frontend
  { 
    id: 'react', name: "React / Next.js", level: 90, parentId: 'js',
    description: "Advanced component synthesis. Capable of summoning complex UIs with optimal rendering cycles.",
    icon: React.createElement(Layout), category: 'magic', x: 25, y: 40 
  },
  { 
    id: 'tailwind', name: "Tailwind CSS", level: 95, parentId: 'react',
    description: "Rapid styling incantations. Bestows utility classes for lightning-fast visual manifestation.",
    icon: React.createElement(PenTool), category: 'magic', x: 15, y: 70 
  },
  { 
    id: 'ts', name: "TypeScript", level: 85, parentId: 'react',
    description: "Type safety wards. Protects the codebase from runtime chaos and null-pointer demons.",
    icon: React.createElement(Box), category: 'magic', x: 35, y: 70 
  },
  // Branch 2 - Backend/Core
  { 
    id: 'node', name: "Node.js", level: 75, parentId: 'js',
    description: "Server-side enchantment. Allows JavaScript to run outside the browser boundary.",
    icon: React.createElement(Server), category: 'core', x: 75, y: 40 
  },
  { 
    id: 'graphql', name: "GraphQL", level: 70, parentId: 'node',
    description: "Precise data fetching rituals. Eliminates over-fetching and adheres to strict schemas.",
    icon: React.createElement(Database), category: 'core', x: 65, y: 70 
  },
  { 
    id: 'docker', name: "Docker/DevOps", level: 60, parentId: 'node',
    description: "Containerization spells. Encapsulates environments for consistent deployment across realms.",
    icon: React.createElement(Cpu), category: 'core', x: 85, y: 70 
  }
];

export const QUEST_LOG: Experience[] = [
  {
    id: 'exp1',
    role: "Senior Spellcaster (Frontend Lead)",
    company: "Arcane Solutions Ltd",
    period: "2021 - Present",
    description: "Leading a guild of 5 developers to build enterprise-scale React applications. Reduced load times by 40% using dark magic (code splitting).",
    type: "work"
  },
  {
    id: 'exp2',
    role: "Apprentice Enchanter (Jr Dev)",
    company: "Pixel Forge",
    period: "2018 - 2021",
    description: "Crafted responsive interfaces and maintained legacy systems. Mastered the art of CSS Grid and Flexbox.",
    type: "work"
  },
  {
    id: 'edu1',
    role: "Master of Computer Science",
    company: "University of Winterhold",
    period: "2014 - 2018",
    description: "Specialized in Human-Computer Interaction and Algorithmic Sorcery.",
    type: "education"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    title: 'The First Code',
    description: 'Successfully deployed the first frontend artifact to the production realm.',
    isUnlocked: true,
    category: 'Coding'
  },
  {
    id: 'a2',
    title: 'Full Stack Initiate',
    description: 'Bridged the gap between Client and Server. Integrated a dark database.',
    isUnlocked: true,
    category: 'Coding'
  },
  {
    id: 'a3',
    title: 'The Pixel Perfecter',
    description: 'Forged a UI indistinguishable from the sacred Figma scrolls.',
    isUnlocked: true,
    category: 'Quality'
  },
  {
    id: 'a4',
    title: 'The Optimist',
    description: 'Achieved a Lighthouse Performance Score of 90+.',
    isUnlocked: true,
    category: 'Speed'
  },
  {
    id: 'a5',
    title: 'The Accessibility Advocate',
    description: 'Ensured the realm is traversable by all (WCAG 2.1 Compliance).',
    isUnlocked: true,
    category: 'Quality'
  },
  {
    id: 'a6',
    title: 'The Bug Hunter',
    description: 'Contributed a fix to an Open Source Guild repository.',
    isUnlocked: false,
    category: 'Community'
  },
  {
    id: 'a7',
    title: 'The Midnight Oil Burner',
    description: 'Completed a significant side quest within 24 hours.',
    isUnlocked: true,
    category: 'Speed'
  },
  {
    id: 'a8',
    title: 'Grand Architect',
    description: 'Architected a system serving over 10,000 users.',
    isUnlocked: false,
    category: 'Coding'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: "Lady Sarah of TechCorp",
    role: "The High Council (Project Manager)",
    content: "Arya's ability to weave complex logic into intuitive interfaces is unmatched in the seven kingdoms. A true master of the React framework.",
    rating: 5
  },
  {
    id: 't2',
    author: "Lord CTO Blackwood",
    role: "Grand Magister (Tech Lead)",
    content: "I have seen many sorcerers attempt to tame the Legacy Codebase, but only Arya succeeded without breaking production.",
    rating: 5
  },
  {
    id: 't3',
    author: "The User Guild",
    role: "The Common Folk (End Users)",
    content: "The interface is swift as an arrow and beautiful as a sunrise. We no longer fear the 404 dragon.",
    rating: 4
  }
];