import { useState, useEffect, useCallback, memo } from "react";
import { Helmet } from "react-helmet-async";
import {
  Mail,
  ExternalLink,
  Sparkles,
  ChevronRight,
  MessagesSquare,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import TechStackModal from "../components/TechStackModal";
import { profile, getSiteUrl } from "../data/profile";

const StatusBadge = memo(() => (
  <div
    className="inline-block animate-float lg:mx-0"
    data-aos="zoom-in"
    data-aos-delay="400"
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur opacity-30 transition duration-1000 group-hover:opacity-50" />
      <div className="relative rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-xl sm:px-4">
        <span className="flex items-center bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-[0.7rem] font-medium text-transparent sm:text-sm">
          <Sparkles className="mr-2 h-3 w-3 text-blue-400 sm:h-4 sm:w-4" />
          {profile.availabilityText}
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] opacity-20 blur-2xl" />
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          {profile.heroTitle[0]}
        </span>
      </span>
      <br />
      <span className="relative mt-2 inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] opacity-20 blur-2xl" />
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          {profile.heroTitle[1]}
        </span>
      </span>
    </h1>
  </div>
));

const PrimaryTechPill = memo(({ tech }) => (
  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 transition-colors hover:bg-white/10">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#4f52c9] to-[#8644c5] opacity-50 blur-md transition-all duration-700 group-hover:opacity-90" />
      <div className="relative h-11 overflow-hidden rounded-lg border border-white/10 bg-[#030014] leading-none backdrop-blur-xl">
        <div className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20 transition-transform duration-500 group-hover:scale-x-100" />
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm transition-all duration-300 group-hover:gap-3">
          <span className="z-10 bg-gradient-to-r from-gray-200 to-white bg-clip-text font-medium text-transparent">
            {text}
          </span>
          <Icon
            className={`z-10 h-4 w-4 text-gray-200 transition-all duration-300 ${
              text === "Contact"
                ? "group-hover:translate-x-1"
                : text === "Email"
                  ? "group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-violet-200"
                  : "group-hover:rotate-45"
            }`}
          />
        </span>
      </div>
    </button>
  </a>
));

const ExpandTechButton = memo(({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-100 transition-all duration-300 hover:border-violet-300/40 hover:bg-violet-500/15"
  >
    <span className="text-base leading-none tracking-[0.28em] text-violet-300">
      ...
    </span>
    <span>More</span>
    <ChevronRight className="h-4 w-4 text-violet-300 transition-transform duration-300 group-hover:translate-x-0.5" />
  </button>
));

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = profile.heroKeywords;
const PRIMARY_TECH_STACK = profile.primaryTechStack;
const TECH_STACK_GROUPS =
  profile.homeTechStackGroups || profile.techStackGroups;

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);

  const siteUrl = getSiteUrl();
  const homeUrl = siteUrl || "/";
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: profile.jobTitle,
    email: profile.email,
    url: homeUrl,
  };

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  useEffect(() => {
    if (!isTechModalOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsTechModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTechModalOpen]);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else if (charIndex > 0) {
      setText((prev) => prev.slice(0, -1));
      setCharIndex((prev) => prev - 1);
    } else {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
      setIsTyping(true);
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED,
    );
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping]);

  const heroSpacing = "1rem";

  const heroSpacingStyle = {
    paddingTop: `calc(var(--navbar-height, 72px) + ${heroSpacing})`,
  };

  const heroViewportStyle = {
    minHeight: `calc(100vh - var(--navbar-height, 72px) - ${heroSpacing})`,
  };

  return (
    <>
      <Helmet>
        <title>{`${profile.fullName} - ${profile.jobTitle}`}</title>
        <meta
          name="description"
          content={`${profile.fullName} portfolio, a ${profile.jobTitle} focused on fullstack web development, scalable systems, and user-centered experiences.`}
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={homeUrl} />
        <meta
          property="og:title"
          content={`${profile.fullName} - ${profile.jobTitle}`}
        />
        <meta
          property="og:description"
          content={`${profile.fullName} portfolio and featured fullstack software projects.`}
        />
        <meta property="og:url" content={homeUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>

      <div
        className="min-h-screen overflow-hidden bg-[#030014] px-[5%] sm:px-[5%] lg:px-[10%]"
        id="Home"
        style={heroSpacingStyle}
      >
        <div
          className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <div className="container mx-auto" style={heroViewportStyle}>
            <div
              className="flex flex-col items-start justify-start gap-8 pb-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16"
              style={heroViewportStyle}
            >
              <div
                className="order-1 w-full space-y-6 text-left sm:space-y-8 lg:w-1/2 lg:mt-0"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="space-y-5 sm:space-y-6">
                  <StatusBadge />
                  <MainTitle />

                  <div
                    className="flex h-8 items-center"
                    data-aos="fade-up"
                    data-aos-delay="800"
                  >
                    <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-xl font-light text-transparent md:text-2xl">
                      {text}
                    </span>
                    <span className="ml-1 h-6 w-[3px] animate-blink bg-gradient-to-t from-[#6366f1] to-[#a855f7]" />
                  </div>

                  <p
                    className="max-w-xl text-base font-light leading-relaxed text-gray-400 md:text-lg"
                    data-aos="fade-up"
                    data-aos-delay="1000"
                  >
                    {profile.shortBio}
                  </p>

                  <div
                    className="space-y-4"
                    data-aos="fade-up"
                    data-aos-delay="1200"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                          Core Stack
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                          Selected technologies I use most often.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-start">
                      {PRIMARY_TECH_STACK.map((tech) => (
                        <PrimaryTechPill key={tech} tech={tech} />
                      ))}
                      <ExpandTechButton
                        onClick={() => setIsTechModalOpen(true)}
                      />
                    </div>
                  </div>

                  <div
                    className="flex w-full flex-row flex-wrap gap-3 justify-start"
                    data-aos="fade-up"
                    data-aos-delay="1400"
                  >
                    <CTAButton
                      href="#Portfolio"
                      text="Projects"
                      icon={ExternalLink}
                    />
                    <CTAButton
                      href="#Contact"
                      text="Contact"
                      icon={MessagesSquare}
                    />
                    <CTAButton
                      href={`mailto:${profile.email}`}
                      text="Email"
                      icon={Mail}
                    />
                  </div>
                </div>
              </div>

              <div
                className="order-2 mt-0 flex h-[280px] w-full items-center justify-center py-0 sm:h-[430px] sm:mt-0 sm:py-0 md:py-[4%] lg:-mt-8 lg:h-[620px] lg:w-1/2 xl:-mt-10 xl:h-[740px]"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                data-aos="fade-left"
                data-aos-delay="600"
              >
                <div className="relative w-[94%] opacity-90 sm:w-full">
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 blur-3xl transition-all duration-700 ease-in-out ${
                      isHovering
                        ? "scale-105 opacity-50"
                        : "scale-100 opacity-20"
                    }`}
                  />

                  <div
                    className={`relative z-10 w-full transform opacity-90 transition-transform duration-500 lg:left-2 lg:-translate-y-4 xl:left-4 xl:-translate-y-6 ${
                      isHovering ? "scale-105" : "scale-100"
                    }`}
                  >
                    <img
                      src="/assets/animations/hero-illustration.gif"
                      alt="Developer Animation"
                      className={`h-full w-full object-contain transition-all duration-500 ${
                        isHovering
                          ? "scale-[95%] rotate-2 sm:scale-[90%] md:scale-[90%] lg:scale-[90%]"
                          : "scale-[90%] sm:scale-[80%] md:scale-[80%] lg:scale-[80%]"
                      }`}
                    />
                  </div>

                  <div
                    className={`pointer-events-none absolute inset-0 transition-all duration-700 ${
                      isHovering ? "opacity-50" : "opacity-20"
                    }`}
                  >
                    <div
                      className={`absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl transition-all duration-700 ${
                        isHovering ? "scale-110" : "scale-100"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TechStackModal
        isOpen={isTechModalOpen}
        onClose={() => setIsTechModalOpen(false)}
        groups={TECH_STACK_GROUPS}
        primaryTechStack={PRIMARY_TECH_STACK}
      />
    </>
  );
};

export default memo(Home);
