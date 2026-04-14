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
      "REST API",
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
  email: "luongxuanminh101@gmail.com",
  aboutAvatar: "/assets/profile/about-avatar.jpg",
  primaryTechStack,
  techStackGroups,
  techStack,
  avatarInitials: "LXM",
  focusArea: {
    value: "Fullstack",
    label: "Core Focus",
    description:
      "Fullstack web development, system workflows, and product implementation",
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
