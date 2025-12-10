import { Experience, Project, Skill } from "./types";

export const DEV_NAME = "Arya Stark";
export const DEV_TITLE = "Architect of Digital Realms";

export const NAVIGATION_ITEMS = [
  { id: 'CITADEL', label: 'The Citadel' },
  { id: 'ARCHIVES', label: 'The Archives' },
  { id: 'LORE', label: 'The Lore' },
  { id: 'MESSENGER', label: 'Messenger' },
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
    category: "Fullstack"
  },
  {
    id: '2',
    title: "Grimoire CMS",
    description: "A headless content management system designed for writers of eldritch horror. Markdown support with live preview.",
    techStack: ["Next.js", "GraphQL", "Node.js"],
    imageUrl: "https://picsum.photos/800/600?random=2",
    demoUrl: "#",
    repoUrl: "#",
    category: "Frontend"
  },
  {
    id: '3',
    title: "Aether Chat",
    description: "Real-time communication platform using WebSockets. Encrypted whispering included.",
    techStack: ["Vue", "Firebase", "SCSS"],
    imageUrl: "https://picsum.photos/800/600?random=3",
    demoUrl: "#",
    repoUrl: "#",
    category: "Frontend"
  },
  {
    id: '4',
    title: "Rune Scryer",
    description: "Data visualization tool for analyzing complex datasets. Uses D3.js to render interactive constellations.",
    techStack: ["D3.js", "React", "Python"],
    imageUrl: "https://picsum.photos/800/600?random=4",
    demoUrl: "#",
    repoUrl: "#",
    category: "UI/UX"
  }
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 95, type: "framework" },
  { name: "TypeScript", level: 90, type: "language" },
  { name: "Tailwind CSS", level: 95, type: "framework" },
  { name: "Node.js", level: 75, type: "tool" },
  { name: "UI Design / Figma", level: 80, type: "tool" },
  { name: "Three.js / WebGL", level: 60, type: "framework" },
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