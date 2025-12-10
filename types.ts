export enum ViewState {
  HOME = 'CITADEL',
  PORTFOLIO = 'QUEST_LOG',
  ABOUT = 'ARSENAL',
  CONTACT = 'GUILD_HALL',
  FORBIDDEN = 'FORBIDDEN_ZONE',
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
  status: 'Completed Quest' | 'In-Progress Quest' | 'Critical Success';
}

export type SkillRank = 'Novice' | 'Apprentice' | 'Adept' | 'Expert' | 'Master' | 'Grandmaster';

export interface SkillNode {
  id: string;
  name: string;
  level: number; // 0-100
  description: string;
  parentId?: string; // For tree connections
  icon: React.ReactNode;
  category: 'core' | 'magic' | 'support';
  x?: number; // Visual position %
  y?: number; // Visual position %
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  isUnlocked: boolean;
  category: 'Coding' | 'Community' | 'Speed' | 'Quality';
}

export interface Testimonial {
  id: string;
  author: string;
  role: string; // "The High Council", etc.
  content: string;
  rating: number; // 1-5 Gems
}