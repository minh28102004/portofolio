import { profile } from "./profile";

const TECH_STACK_ASSET_BASE_PATH = "/assets/tech-stack";

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
  Redux: "redux",
  "React Native": "react-native",
  Flutter: "flutter",
  "Node.js": "nodejs",
  "Express.js": "express",
  NestJS: "nestjs",
  "REST API": "rest-api",
  MongoDB: "mongodb",
  PostgreSQL: "postgresql",
  "SQL Server": "sql-server",
  Firebase: "firebase",
  Git: "git",
  GitHub: "github",
  Axios: "axios",
  Postman: "postman",
  Insomnia: "insomnia",
  Figma: "figma",
  Vite: "vite",
  Vercel: "vercel",
  Render: "render",
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
    iconCandidates: buildIconCandidates(fileName),
  };
};

export const portfolioTechStackItems =
  profile.techStack.map(buildTechStackItem);

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
