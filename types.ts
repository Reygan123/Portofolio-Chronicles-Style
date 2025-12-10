export enum ViewState {
  HOME = 'CITADEL',
  PORTFOLIO = 'ARCHIVES',
  ABOUT = 'LORE',
  CONTACT = 'MESSENGER',
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  demoUrl: string;
  repoUrl: string;
  category: 'Frontend' | 'Fullstack' | 'UI/UX';
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  type: 'language' | 'framework' | 'tool';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education';
}