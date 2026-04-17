import { profile } from "./profile";

const TECH_STACK_ASSET_BASE_PATH = "/assets/tech-stack";
const AVAILABLE_TECH_STACK_ASSETS = new Set([
  "ant-design",
  "axios",
  "bootstrap",
  "css",
  "express",
  "figma",
  "firebase",
  "flutter",
  "git",
  "github",
  "html",
  "insomnia",
  "javascript",
  "material-ui",
  "mongodb",
  "nestjs",
  "nextjs",
  "nodejs",
  "postgresql",
  "postman",
  "react",
  "react-native",
  "redux",
  "render",
  "shadcn-ui",
  "sql-server",
  "tailwind-css",
  "typescript",
  "vercel",
  "vite",
]);

const TECH_STACK_FILE_NAMES = {
  HTML: "html",
  CSS: "css",
  JavaScript: "javascript",
  TypeScript: "typescript",
  React: "react",
  "Next.js": "nextjs",
  "Tailwind CSS": "tailwind-css",
  Bootstrap: "bootstrap",
  "Material UI": "material-ui",
  "Ant Design": "ant-design",
  "shadcn/ui": "shadcn-ui",
  Redux: "redux",
  "RTK Query": "rtk-query",
  "React Native": "react-native",
  Flutter: "flutter",
  "Node.js": "nodejs",
  "Express.js": "express",
  NestJS: "nestjs",
  "REST API": "rest-api",
  "JWT Authentication": "jwt-authentication",
  MongoDB: "mongodb",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  "SQL Server": "sql-server",
  Firebase: "firebase",
  Supabase: "supabase",
  Git: "git",
  GitHub: "github",
  Axios: "axios",
  Postman: "postman",
  Insomnia: "insomnia",
  Figma: "figma",
  Vite: "vite",
  Vercel: "vercel",
  Render: "render",
  "Draw.io": "draw-io",
  Lucidchart: "lucidchart",
  "Visual Paradigm": "visual-paradigm",
  "Manual Testing": "manual-testing",
  "API Testing": "api-testing",
  "Test Case Design": "test-case-design",
  "Bug Reporting": "bug-reporting",
  "Basic Debugging": "basic-debugging",
  "UX Testing": "ux-testing",
};

const ASSET_EXTENSIONS = ["svg", "png", "webp", "jpg", "jpeg"];

const buildIconCandidates = (fileName) =>
  ASSET_EXTENSIONS.map(
    (extension) => `${TECH_STACK_ASSET_BASE_PATH}/${fileName}.${extension}`,
  );

const buildTechStackItem = (item) => {
  const fileName =
    TECH_STACK_FILE_NAMES[item] ||
    item
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return {
    language: item,
    fileName,
    iconCandidates: AVAILABLE_TECH_STACK_ASSETS.has(fileName)
      ? buildIconCandidates(fileName)
      : [],
  };
};

export const portfolioTechStackGroups = profile.techStackGroups.map((group) => ({
  ...group,
  items: group.items.map(buildTechStackItem),
}));

export const portfolioTechStackItems =
  portfolioTechStackGroups.flatMap((group) => group.items);

export const techStackAssetGuide = profile.techStackGroups.flatMap((group) =>
  group.items.map((item) => {
    const tech = buildTechStackItem(item);

    return {
      group: group.title,
      language: tech.language,
      fileName: tech.fileName,
    };
  }),
);
