import { CareerMilestone, SkillItem, TestimonialItem } from '../types';

export const personalBio = {
  name: "Prasad Sawant",
  title: "System Engineer",
  location: "Navi Mumbai, India",
  tagline: "Maintaining mission-critical banking platforms powering millions of transactions. Specialized in Linux, Oracle, automation, platform migrations, and building reliable systems with 99.9%+ availability. Expanding into AI-powered automation and modern software engineering.",
  avatar: "/avatar.jpg", // Real profile photo
  socials: {
    github: "https://github.com/prasads24",
    linkedin: "https://www.linkedin.com/in/prasadsawant24",
    instagram: "https://www.instagram.com/_prasads_",
    email: "prasadsawant323@gmail.com"
  },
  stats: {
    experienceYears: "4.7 Yrs",
    projectsCompleted: "100",
    cloudUptime: "99.9%+",
    linesOfCode: "20+"
  }
};

export const milestones: CareerMilestone[] = [
  
  {
    id: "milestone-4",
    role: "System Engineer",
    company: "Tata Consultancy Services Ltd",
    period: "Mar 2025 - Present",
    location: "Navi Mumbai, India",
    description: "Provide service enhancements for the high-availability Core Banking Solution (CBS) TCS BaNCS application at State Bank of India (SBI), ensuring client business continuity and system scaling.",
    narrative: "When the modernization initiative started, I already knew exactly where the platform broke. That's the whole reason I could help move it: I'd spent four years watching it fail in every way it knew how. I migrated the AutoSys scheduler off HP-UX onto RHEL — thousands of batch jobs, zero tolerance for disruption — and I've been writing the automation that means nobody else has to do at 3 AM what I used to do at 3 AM.",
    achievements: [
      "Playing a key engineering role in the ongoing platform modernization initiative to upgrade the CBS application from legacy UNIX to modern Linux environments, ensuring seamless transition and operational continuity.",
      "Led migration of AutoSys enterprise job scheduler from version 12.1 (HP-UX) to version 24.0.1 (RHEL) as part of a major platform modernization initiative.",
      "Designed and executed Disaster Recovery (DR) failover procedures for the CBS platform, reducing recovery execution time by approximately 10% through process optimization.",
      "Developed Shell automation scripts integrated with AutoSys to eliminate repetitive operational tasks, reducing manual workload by approximately 15% and improving execution consistency.",
      "Contributed to the addition of CBS application servers and database nodes to improve system capacity, assisting in configuration and validation with minimal downtime.",
    ],
    skills: ["Unix", "Linux", "Shell Scripting", "AutoSys", "COBOL", "TCS BaNCS"],
    category: "architecture",
    impactColor: "from-amber-500 via-orange-500 to-red-500",
    specSheet: {
      language: "Shell Scripting, COBOL",
      runtime: "Red Hat Enterprise Linux (RHEL), HP-UX",
      architecture: "Core Banking Solutions (TCS BaNCS)",
      database: "Oracle Database (Data Pump Utility)",
      devops: "AutoSys Scheduler, Unix/Linux Utilities"
    },
    projectTitle: "AutoSys Platform Modernization",
    projectDesc: "Coordinated the end-to-end upgrade of the critical enterprise job scheduler from legacy HP-UX environments to modern Red Hat Enterprise Linux (RHEL), modernizing thousands of batch jobs with zero operational disruption."
  },
  {
    id: "milestone-3",
    role: "Student",
    company: "Amity University",
    period: "Jan 2026 - Present",
    location: "Navi Mumbai, India",
    description: "Transitioning from enterprise production engineering to AI-powered software development through advanced coursework, practical projects, and modern machine learning technologies.",
    narrative: "And now, on top of all that, I'm a student again. Part of it is a deliberate pivot — I want the next decade of my career to be built on something newer than what I started on. Part of it is just curiosity; the field is moving fast and I'd rather be in it than reading about it. But mostly it's that I can't stop looking at the systems I already work on and seeing what could be there instead. Four years of knowing exactly how a system works is a good place to start asking what it could become.",
    achievements: [
      "Enrolled in advanced AI and ML courses, gaining hands-on experience with neural networks, deep learning, and data analytics.",
    ],
    skills: ["AI/ML", "Deep Learning", "Python", "Cloud", "Research"],
    category: "ai",
    impactColor: "from-amber-500 via-orange-500 to-red-500",
    specSheet: {
      language: "Python, C++",
      runtime: "TensorFlow, PyTorch",
      architecture: "Artificial Intelligence and Machine Learning Systems",
      database: "Oracle Database",
      devops: "Cloud Platforms (VMware)"
    },
    projectTitle: '',
    projectDesc: ''
  },
  {
    id: "milestone-2",
    role: "Support Executive",
    company: "Tata Consultancy Services Ltd",
    period: "Dec 2021 - Mar 2025",
    location: "Navi Mumbai, India",
    description: "Manage 24/7 technical shifts and cross-functional collaborations to ensure rapid incident response, high-priority defect analysis, and successful close-out operations for State Bank of India's Core Banking System.",
    narrative: "Then the theory ran out. My first real job put me on India's largest bank's core banking system — a platform where “let me try something” isn't an option, because a batch job that dies at 3 AM means a salary doesn't land in someone's account by morning. Nothing in college prepares you for that weight. So I learned the way you actually learn: reading COBOL under pressure, tracing broken batches, working shifts through End-of-Year cycles where one mistake compounds across millions of accounts. Over four years I stopped being someone who knew about systems and became someone who knew this system — where it breaks, why it breaks, and what it costs when it does.",
    achievements: [
      "Led support team through the critical CBS End-of-Year operations phase, implementing process enhancements that boosted overall team productivity and client satisfaction.",
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
      architecture: "Core Banking Solutions (TCS BaNCS)",
      database: "Oracle Database",
      devops: "Disaster Recovery (DR) Failover, Incident Response"
    },
    projectTitle: "SBI End-of-Year Processing",
    projectDesc: "Spearheaded shift through the highly intensive year-end financial closing cycle on TCS BaNCS, ensuring secure batch completion and high SLA adherence"
  },
  {
    id: "milestone-1",
    role: "Bachelor of Science - IT",
    company: "University of Mumbai",
    period: "Jun 2018 - May 2021",
    location: "Ratnagiri, India",
    description: "Completed undergraduate degree program in Information Technology with deep emphasis on software systems, database structures, and UNIX operating system environments.",
    narrative: "Three years in Ratnagiri learning how the machine actually works — not the syntax, the why. Databases, Linux, C++, the logic underneath all of it. What stuck wasn't any one subject; it was realizing a computer does exactly what you tell it, no more and no less, and that every bug is really a gap between what you meant and what you wrote. I graduated with an 8.83, but the thing I was proudest of was a door that unlocked when it recognized my face — a Raspberry Pi, a camera, and OpenCV, taught to do something genuinely useful. That was the first time the theory turned into something real.",
    achievements: [
      "Graduated with a stellar academic distinction scoring 8.83 CGPI.",
      "Completed a specialized CDAC Diploma in Multilingual Computer Programming (Jan 2018).",
      "Acquired comprehensive theoretical and practical foundations in relational database schemas, query designs, and procedural architectures.",
    ],
    skills: ["Unix", "SQL", "C++", "Python", "DBMS"],
    category: "frontend",
    impactColor: "from-cyan-400 via-teal-500 to-emerald-500",
    specSheet: {
      language: "Python, C++, SQL, HTML/CSS",
      runtime: "Windows Server, Linux VM",
      architecture: "Relational Database Management Systems (RDBMS)",
      database: "MySQL, Oracle Database",
      devops: "Linux Command Line"
    },
    projectTitle: "AI-Powered Face unlock door system",
    projectDesc: "Designed and developed a smart door access system using raspberry Pi, OpenCV, and Python. The system performs real-time facial recognition through a camera, granting access to authorized personnel and enhancing security measures."
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
 
];
