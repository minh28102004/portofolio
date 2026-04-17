const fullName = "L\u01b0\u01a1ng Nguy\u1ec5n Xu\u00e2n Minh";

const primaryTechStack = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "MongoDB",
  "PostgreSQL",
];

const techStackGroups = [
  {
    title: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
      "Ant Design",
      "shadcn/ui",
      "Redux",
      "React Native",
      "Flutter",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "NestJS",
    ],
  },
  {
    title: "Database & Services",
    items: ["MongoDB", "PostgreSQL", "SQL Server", "Firebase"],
  },
  {
    title: "Tools & Platforms",
    items: [
      "Git",
      "GitHub",
      "Axios",
      "Postman",
      "Insomnia",
      "Figma",
      "Vite",
      "Vercel",
      "Render",
    ],
  },
];

const homeTechStackGroups = [
  {
    title: "Frontend",
    description:
      "Modern web interfaces, component-driven UI, and responsive styling systems.",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
      "Ant Design",
      "shadcn/ui",
      "Redux",
      "RTK Query",
    ],
  },
  {
    title: "Mobile",
    description:
      "Cross-platform mobile development for native-feeling app experiences.",
    items: ["React Native", "Flutter"],
  },
  {
    title: "Backend & API",
    description:
      "Server-side development, service integration, and authentication workflows.",
    items: [
      "Node.js",
      "Express.js",
      "NestJS",
      "REST API",
      "JWT Authentication",
    ],
  },
  {
    title: "Database",
    description:
      "Relational and document databases used to model and deliver production data.",
    items: ["MongoDB", "PostgreSQL", "MySQL", "SQL Server"],
  },
  {
    title: "Cloud & Services",
    description:
      "Deployment platforms and backend services that support product delivery.",
    items: ["Firebase", "Supabase", "Vercel", "Render"],
  },
  {
    title: "Tools & Workflow",
    description:
      "Everyday tools for design handoff, API integration, collaboration, and shipping.",
    items: [
      "Git",
      "GitHub",
      "Axios",
      "Postman",
      "Insomnia",
      "Figma",
      "Vite",
      "Draw.io",
      "Lucidchart",
      "Visual Paradigm",
    ],
  },
  {
    title: "Testing & QA",
    description:
      "Quality-focused practices for validation, troubleshooting, and user-facing stability.",
    items: [
      "Manual Testing",
      "API Testing",
      "Test Case Design",
      "Bug Reporting",
      "Basic Debugging",
      "UX Testing",
    ],
  },
];

const techStack = Array.from(
  new Set(techStackGroups.flatMap((group) => group.items)),
);

export const profile = {
  fullName,
  welcomeDisplayName: "Xu\u00e2n Minh Dev",
  brandName: "Portfolio Website",
  jobTitle: "Software Developer",
  heroTitle: ["Software", "Developer"],
  heroKeywords: ["Fullstack Developer", "Software Engineer"],
  availabilityText: "Available for New Opportunities",
  shortBio:
    "Building end-to-end web products with a strong focus on scalable architecture, clean user experience, and reliable backend integration.",
  aboutBio: `I am ${fullName}, a software developer who enjoys turning ideas into polished, scalable, and user-focused digital products from frontend experience to backend logic.`,
  quote:
    "Keep learning, keep improving, and always design with the user in mind.",
  email: "luongxuanminh102@gmail.com",
  aboutAvatar: "/assets/profile/about-avatar.jpg",
  primaryTechStack,
  techStackGroups,
  homeTechStackGroups,
  techStack,
  avatarInitials: "LXM",
  focusArea: {
    value: "Fullstack",
    label: "Core Focus",
    description:
      "Frontend, backend, and product delivery across fullstack web applications",
  },
};

export const getSiteUrl = () =>
  typeof window !== "undefined" ? window.location.origin : "";

export const getAbsoluteUrl = (path = "/") => {
  const origin = getSiteUrl();

  if (!origin) {
    return path;
  }

  return path.startsWith("/") ? `${origin}${path}` : `${origin}/${path}`;
};
