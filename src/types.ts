export interface CareerMilestone {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  /** First-person story beat, shown only in Immersive Story Scroll mode. */
  narrative?: string;
  achievements: string[];
  skills: string[];
  category: 'frontend' | 'backend' | 'architecture' | 'ai';
  impactColor: string; // e.g. 'from-blue-500 to-cyan-500'
  specSheet: {
    language: string;
    runtime: string;
    architecture: string;
    database: string;
    devops: string;
  };
  projectTitle: string;
  projectDesc: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'languages' | 'frameworks' | 'cloud' | 'tools' | 'soft';
  proficiency: number; // 0-100
  yearsOfExperience: number;
  iconName: string; // matches lucide icon names
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  title: string;
  company: string;
  relationship: string;
  text: string;
  avatar: string;
}

export interface SpatialWindow {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isOpen: boolean;
  isMinimized: boolean;
  type: 'journey' | 'skills' | 'terminal' | 'about' | 'gallery';
  milestoneId?: string; // If displaying a specific milestone
}
