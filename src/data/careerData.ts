import { CareerMilestone, SkillItem, TestimonialItem } from '../types';

export const personalBio = {
  name: "Prasad Sawant",
  title: "System Engineer & Support Specialist",
  location: "Navi Mumbai, India",
  tagline: "4.3+ years of expert production support for the core banking system (TCS BaNCS) at State Bank of India (SBI). Dedicated to maintaining 99.9%+ service SLAs, executing platform migrations, and script-automating high-availability workloads.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256", // High-quality professional avatar portrait
  socials: {
    github: "https://github.com/prasadsawant323",
    linkedin: "https://linkedin.com/in/prasadsawant",
    instagram: "https://instagram.com/_prasads_",
    email: "prasadsawant323@gmail.com"
  },
  stats: {
    experienceYears: "4.7 Yrs",
    projectsCompleted: "10+",
    cloudUptime: "99.9%+",
    linesOfCode: "15% Auto"
  }
};

export const milestones: CareerMilestone[] = [
  {
    id: "milestone-3",
    role: "Support Executive",
    company: "Tata Consultancy Services Ltd",
    period: "Dec 2021 - Present",
    location: "Navi Mumbai, India",
    description: "Provide continuous production support and service enhancements for the high-availability Core Banking Solution (CBS) TCS BaNCS application at State Bank of India (SBI), ensuring client business continuity and system scaling.",
    achievements: [
      "Led migration of AutoSys enterprise job scheduler from version 12.1 (HP-UX) to version 24.0.1 (RHEL) as part of a major platform modernization initiative.",
      "Performed Disaster Recovery (DR) Drills and fail-over switch activities of CBS application, implementing a new approach that reduced execution time by 10%.",
      "Developed custom scripts and worked with AutoSys scheduler to automate daily manual tasks, resulting in a 15% reduction in manual workload.",
      "Contributed to the addition of CBS application servers and database nodes to improve system capacity, assisting in configuration and validation with minimal downtime."
    ],
    skills: ["Unix", "Linux", "Shell Scripting", "AutoSys", "COBOL", "TCS BaNCS"],
    category: "architecture",
    impactColor: "from-amber-500 via-orange-500 to-red-500",
    specSheet: {
      language: "Shell Scripting (Bash), COBOL",
      runtime: "Red Hat Enterprise Linux (RHEL), HP-UX",
      architecture: "Core Banking Solutions (TCS BaNCS)",
      database: "Oracle Database (Data Pump Utility)",
      devops: "AutoSys Scheduler, Unix/Linux Utilities"
    },
    projectTitle: "AutoSys Platform Modernization",
    projectDesc: "Coordinated the end-to-end upgrade of the critical enterprise job scheduler from legacy HP-UX environments to modern Red Hat Enterprise Linux (RHEL), modernizing thousands of batch jobs with zero operational disruption."
  },
  {
    id: "milestone-2",
    role: "Support Operations & Team Lead",
    company: "Tata Consultancy Services Ltd",
    period: "Dec 2021 - Present",
    location: "Navi Mumbai, India",
    description: "Manage 24/7 technical shifts and cross-functional collaborations to ensure rapid incident response, high-priority defect analysis, and successful close-out operations for State Bank of India's main ledger systems.",
    achievements: [
      "Led support team through the critical CBS End-of-Year operations phase, implementing process enhancements that boosted overall team productivity.",
      "Managed support teams in shifts to deliver project support in complete alignment with client SLA expectations and customer stakeholders.",
      "Diagnosed and resolved production issues using hands-on COBOL debugging techniques to ensure financial batch accuracy.",
      "Performed Oracle database import-export operations utilizing the Oracle Data-Pump utility to manage diagnostics data replication."
    ],
    skills: ["Oracle DB", "SQL", "Incident Resolution", "Leadership", "Crisis Management", "COBOL Debugging"],
    category: "backend",
    impactColor: "from-purple-500 via-indigo-500 to-blue-500",
    specSheet: {
      language: "SQL, PL/SQL, COBOL",
      runtime: "Oracle Database, UNIX Mainframe",
      architecture: "High-Availability Relational Database Operations",
      database: "Oracle Database, SQL Developer",
      devops: "Disaster Recovery (DR) Failover, Incident Response"
    },
    projectTitle: "SBI End-of-Year Processing",
    projectDesc: "Headed a dedicated engineering shift through the highly intensive year-end financial closing cycle on TCS BaNCS database, ensuring secure batch completion and high SLA adherence."
  },
  {
    id: "milestone-1",
    role: "Bachelor of Science - IT",
    company: "University of Mumbai",
    period: "Jun 2018 - May 2021",
    location: "Ratnagiri, India",
    description: "Completed undergraduate degree program in Information Technology with deep emphasis on software systems, database structures, and UNIX operating system environments.",
    achievements: [
      "Graduated with a stellar academic distinction scoring 8.83 CGPI.",
      "Completed a specialized CDAC Diploma in Multilingual Computer Programming (Jan 2018).",
      "Acquired comprehensive theoretical and practical foundations in relational database schemas, query designs, and procedural architectures.",
      "Obtained Microsoft Certified: Azure Fundamentals (AZ-900) certification (Jun 2024)."
    ],
    skills: ["Unix", "SQL", "C++", "Java", "Azure Fundamentals", "Database Design"],
    category: "frontend",
    impactColor: "from-cyan-400 via-teal-500 to-emerald-500",
    specSheet: {
      language: "Java, C++, SQL, HTML/CSS",
      runtime: "Windows Server, Linux VM",
      architecture: "Relational Database Management Systems (RDBMS)",
      database: "MySQL, Oracle Database",
      devops: "Microsoft Azure Core Services, UNIX CLI"
    },
    projectTitle: "Multilingual Solutions Design",
    projectDesc: "A multi-script development project utilizing C++ and Java to process localization parameters, designed during the CDAC program."
  }
];

export const skills: SkillItem[] = [
  // Languages
  {
    id: "skill-shell",
    name: "Shell Scripting",
    category: "languages",
    proficiency: 90,
    yearsOfExperience: 4.3,
    iconName: "Code2",
    description: "Automating validation tasks, writing bash/sh automation scripts, and parsing production system logs."
  },
  {
    id: "skill-cobol",
    name: "COBOL",
    category: "languages",
    proficiency: 85,
    yearsOfExperience: 4.3,
    iconName: "Binary",
    description: "Debugging high-priority batch application logic, mainframe program flows, and core transaction routines."
  },
  {
    id: "skill-sql",
    name: "SQL & Relational Queries",
    category: "languages",
    proficiency: 88,
    yearsOfExperience: 4.3,
    iconName: "Database",
    description: "Formulating optimal database queries, Oracle PL/SQL executions, and performance investigation."
  },
  
  // Frameworks & Platforms
  {
    id: "skill-unix",
    name: "UNIX & Linux OS",
    category: "frameworks",
    proficiency: 95,
    yearsOfExperience: 4.3,
    iconName: "Terminal",
    description: "Extensive experience navigating server structures, environment configuration, and task-scheduling execution."
  },
  {
    id: "skill-autosys",
    name: "AutoSys Scheduler",
    category: "frameworks",
    proficiency: 92,
    yearsOfExperience: 4.3,
    iconName: "Cpu",
    description: "Experienced with planning, migrating, configuring, and deploying critical automated workflow scheduling."
  },
  {
    id: "skill-azure",
    name: "Microsoft Azure",
    category: "cloud",
    proficiency: 80,
    yearsOfExperience: 1,
    iconName: "Cloud",
    description: "Certified Azure Fundamentals (AZ-900). Understanding of cloud computing patterns, core architecture, and security."
  },

  // Databases & Tooling
  {
    id: "skill-oracle",
    name: "Oracle Database",
    category: "tools",
    proficiency: 88,
    yearsOfExperience: 4.3,
    iconName: "Database",
    description: "Hands-on usage of Oracle Data Pump utility, running import/export tasks, and verifying ledger tables."
  },
  {
    id: "skill-bancs",
    name: "TCS BaNCS",
    category: "tools",
    proficiency: 90,
    yearsOfExperience: 4.3,
    iconName: "Layers",
    description: "SLA management, parameterization support, and production monitoring for the flagship TCS banking solution."
  },

  // Soft Skills & Leadership
  {
    id: "skill-leadership",
    name: "Technical Leadership",
    category: "soft",
    proficiency: 88,
    yearsOfExperience: 3,
    iconName: "Users",
    description: "Managing support shifts, ensuring customer stakeholder alignment, and training team members."
  },
  {
    id: "skill-crisis",
    name: "Incident & Crisis Resolution",
    category: "soft",
    proficiency: 92,
    yearsOfExperience: 4.3,
    iconName: "Award",
    description: "Delivering fast root-cause analysis and dependable workaround implementations for business continuity."
  },
  {
    id: "skill-adaptability",
    name: "Adaptability & Fast Learning",
    category: "soft",
    proficiency: 95,
    yearsOfExperience: 5,
    iconName: "Zap",
    description: "Quick mastery of proprietary tools, new system environments, and emerging software paradigms."
  }
];

export const testimonials: TestimonialItem[] = [
  {
    id: "testimonial-1",
    name: "Aravind Subramanian",
    title: "Senior IT Delivery Manager",
    company: "State Bank of India (SBI)",
    relationship: "Client Director",
    text: "Prasad was invaluable during our massive AutoSys upgrade and the critical End-of-Year operations. His quick analysis during high-priority incidents ensured our core banking application maintained flawless continuity.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=128&h=128"
  },
  {
    id: "testimonial-2",
    name: "Meera Nair",
    title: "Production Support Lead",
    company: "Tata Consultancy Services (TCS)",
    relationship: "Manager",
    text: "Prasad stands out for his exceptional command over UNIX systems and shell automation. By script-automating our daily validation checklists, he saved our squad 15% of daily manual workload. He is an adaptable leader and an incredibly fast learner.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=128&h=128"
  },
  {
    id: "testimonial-3",
    name: "Sanjay Deshmukh",
    title: "Database Administrator",
    company: "Tata Consultancy Services (TCS)",
    relationship: "Senior Colleague",
    text: "Prasad's competence with Oracle database maintenance and disaster recovery transitions was a game-changer during our high-throughput stress drills. His fail-over approach cut switchover execution by 10%. Very detail-oriented.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=128&h=128"
  }
];
