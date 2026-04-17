import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Sparkles,
  Code2,
  Layout,
  Atom,
  Wind,
  Workflow,
  Smartphone,
  Server,
  Braces,
  Boxes,
  Database,
  GitBranch,
  Github,
  Send,
  PenTool,
  Cloud,
  Flame,
  Wrench,
  Bug,
} from "lucide-react";

const SECTION_ICONS = {
  Frontend: Code2,
  Mobile: Smartphone,
  Backend: Server,
  "Backend & API": Server,
  Database: Database,
  "Database & Services": Database,
  "Cloud & Services": Cloud,
  "Tools & Platforms": Wrench,
  "Tools & Workflow": Wrench,
  "Testing & QA": Bug,
};

const SECTION_STYLES = {
  Frontend: {
    header: "text-cyan-200",
    badge:
      "border-cyan-400/20 bg-cyan-500/10 text-cyan-100 hover:border-cyan-300/40 hover:bg-cyan-500/15",
    icon: "text-cyan-300",
  },
  Mobile: {
    header: "text-sky-100",
    badge:
      "border-sky-400/20 bg-sky-500/10 text-sky-100 hover:border-sky-300/40 hover:bg-sky-500/15",
    icon: "text-sky-300",
  },
  Backend: {
    header: "text-emerald-200",
    badge:
      "border-emerald-400/20 bg-emerald-500/10 text-emerald-100 hover:border-emerald-300/40 hover:bg-emerald-500/15",
    icon: "text-emerald-300",
  },
  "Backend & API": {
    header: "text-emerald-200",
    badge:
      "border-emerald-400/20 bg-emerald-500/10 text-emerald-100 hover:border-emerald-300/40 hover:bg-emerald-500/15",
    icon: "text-emerald-300",
  },
  Database: {
    header: "text-amber-100",
    badge:
      "border-amber-400/20 bg-amber-500/10 text-amber-50 hover:border-amber-300/40 hover:bg-amber-500/15",
    icon: "text-amber-300",
  },
  "Database & Services": {
    header: "text-amber-100",
    badge:
      "border-amber-400/20 bg-amber-500/10 text-amber-50 hover:border-amber-300/40 hover:bg-amber-500/15",
    icon: "text-amber-300",
  },
  "Cloud & Services": {
    header: "text-indigo-100",
    badge:
      "border-indigo-400/20 bg-indigo-500/10 text-indigo-50 hover:border-indigo-300/40 hover:bg-indigo-500/15",
    icon: "text-indigo-300",
  },
  "Tools & Platforms": {
    header: "text-fuchsia-100",
    badge:
      "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-50 hover:border-fuchsia-300/40 hover:bg-fuchsia-500/15",
    icon: "text-fuchsia-300",
  },
  "Tools & Workflow": {
    header: "text-fuchsia-100",
    badge:
      "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-50 hover:border-fuchsia-300/40 hover:bg-fuchsia-500/15",
    icon: "text-fuchsia-300",
  },
  "Testing & QA": {
    header: "text-rose-100",
    badge:
      "border-rose-400/20 bg-rose-500/10 text-rose-50 hover:border-rose-300/40 hover:bg-rose-500/15",
    icon: "text-rose-300",
  },
};

const TECH_ICONS = {
  HTML: Code2,
  CSS: Layout,
  JavaScript: Code2,
  TypeScript: Braces,
  React: Atom,
  "Next.js": Layout,
  "Tailwind CSS": Wind,
  Bootstrap: Layout,
  "Material UI": Layout,
  "Ant Design": Layout,
  "shadcn/ui": Sparkles,
  Redux: Workflow,
  "RTK Query": Workflow,
  "React Native": Smartphone,
  Flutter: Smartphone,
  "Node.js": Server,
  "Express.js": Braces,
  NestJS: Boxes,
  "REST API": Send,
  "JWT Authentication": Braces,
  MongoDB: Database,
  PostgreSQL: Database,
  MySQL: Database,
  "SQL Server": Database,
  Git: GitBranch,
  GitHub: Github,
  Axios: Send,
  Postman: Send,
  Insomnia: Sparkles,
  Figma: PenTool,
  "Draw.io": PenTool,
  Lucidchart: PenTool,
  "Visual Paradigm": PenTool,
  Vercel: Cloud,
  Render: Cloud,
  Firebase: Flame,
  Supabase: Cloud,
  "Manual Testing": Bug,
  "API Testing": Send,
  "Test Case Design": PenTool,
  "Bug Reporting": Bug,
  "Basic Debugging": Bug,
  "UX Testing": Sparkles,
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.24, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.97,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: 18,
    scale: 0.985,
    filter: "blur(8px)",
    transition: {
      duration: 0.22,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.16 } },
};

const TechBadge = ({ tech, sectionTitle }) => {
  const Icon = TECH_ICONS[tech] || Sparkles;
  const sectionStyle = SECTION_STYLES[sectionTitle] || SECTION_STYLES.Frontend;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-300 ${sectionStyle.badge}`}
    >
      <Icon className={`h-4 w-4 ${sectionStyle.icon}`} />
      <span>{tech}</span>
    </div>
  );
};

const TechStackModal = ({ isOpen, onClose, groups = [] }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#030014]/70 p-4 backdrop-blur-md sm:p-6 lg:p-8"
          onClick={onClose}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#050816]/95 shadow-[0_30px_120px_rgba(88,28,135,0.45)]"
            style={{ maxHeight: "calc(100vh - 3rem)" }}
            onClick={(event) => event.stopPropagation()}
            variants={modalVariants}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_35%)]" />

            <motion.div
              className="relative border-b border-white/10 px-6 py-5 sm:px-8"
              variants={sectionVariants}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    <Sparkles className="h-4 w-4 text-violet-300" />
                    <span className="text-xs uppercase tracking-[0.35em] text-white/60">
                      Full Stack Overview
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                      Tech Stack &amp; Delivery Toolkit
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                      A structured overview of the technologies, services, and
                      workflow practices I use across frontend, backend,
                      databases, delivery, and QA.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                  aria-label="Close technologies modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* <div className="mt-5 flex flex-wrap gap-3">
                {primaryTechStack.map((tech) => (
                  <div
                    key={tech}
                    className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3.5 py-2 text-sm text-violet-100"
                  >
                    <Sparkles className="h-4 w-4 text-violet-300" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div> */}
            </motion.div>

            <div className="relative min-h-0 flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-violet-500/30 sm:px-8 sm:py-8">
              <div className="space-y-8">
                {groups.map((group) => {
                  const SectionIcon =
                    SECTION_ICONS[group.title] || SECTION_ICONS.Frontend;
                  const sectionStyle =
                    SECTION_STYLES[group.title] || SECTION_STYLES.Frontend;

                  return (
                    <motion.section
                      key={group.title}
                      className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                      variants={sectionVariants}
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                          <SectionIcon
                            className={`h-5 w-5 ${sectionStyle.icon}`}
                          />
                        </div>
                        <div>
                          <h4
                            className={`text-lg font-semibold sm:text-xl ${sectionStyle.header}`}
                          >
                            {group.title}
                          </h4>
                          <p className="text-sm text-slate-400">
                            {group.description ||
                              `${group.items.length} core technologies`}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {group.items.map((tech) => (
                          <TechBadge
                            key={`${group.title}-${tech}`}
                            tech={tech}
                            sectionTitle={group.title}
                          />
                        ))}
                      </div>
                    </motion.section>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TechStackModal;
