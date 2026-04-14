import React, { useEffect, memo, useMemo, useState } from "react";
import {
  Mail,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { profile } from "../data/profile";

const Header = memo(() => (
  <div className="mb-2 text-center lg:mb-8">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Building clear and engaging web experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => {
  const [showFallback, setShowFallback] = useState(false);

  return (
    <div className="flex items-center justify-end p-0 py-2 pb-2 sm:p-12 sm:py-0 sm:pb-0">
      <div
        className="relative group"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="absolute -inset-6 z-0 hidden opacity-[25%] sm:block">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 blur-2xl animate-spin-slower" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 blur-2xl animate-pulse-slow opacity-50" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 blur-2xl animate-float opacity-50" />
        </div>

        <div className="relative">
          <div className="h-72 w-72 transform overflow-hidden rounded-full shadow-[0_0_40px_rgba(120,119,198,0.3)] transition-all duration-700 group-hover:scale-105 sm:h-80 sm:w-80">
            <div className="absolute inset-0 z-20 rounded-full border-4 border-white/20 transition-all duration-700 group-hover:scale-105 group-hover:border-white/40" />
            <div className="absolute inset-0 z-10 hidden bg-gradient-to-b from-black/20 via-transparent to-black/40 transition-opacity duration-700 group-hover:opacity-0 sm:block" />
            <div className="absolute inset-0 z-10 hidden bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 opacity-0 transition-opacity duration-700 group-hover:opacity-100 sm:block" />

            {showFallback ? (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#7c3aed]">
                <span className="ml-4 text-6xl font-bold tracking-[0.25em] text-white/90 sm:text-7xl">
                  {profile.avatarInitials}
                </span>
              </div>
            ) : (
              <img
                src={profile.aboutAvatar}
                alt={`${profile.fullName} portrait`}
                className="h-full w-full object-cover object-top"
                loading="lazy"
                onError={() => setShowFallback(true)}
              />
            )}

            <div className="absolute inset-0 z-20 hidden opacity-0 transition-all duration-700 group-hover:opacity-100 sm:block">
              <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-tr from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <div className="absolute inset-0 translate-y-full transform bg-gradient-to-bl from-transparent via-white/10 to-transparent transition-transform delay-100 duration-1000 group-hover:-translate-y-full" />
              <div className="absolute inset-0 scale-0 rounded-full border-8 border-white/10 transition-transform duration-700 group-hover:scale-100 animate-pulse-slow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation }) => (
    <div
      data-aos={animation}
      data-aos-duration={1300}
      className="relative group"
    >
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <span
            className="text-4xl font-bold text-white"
            data-aos="fade-up-left"
            data-aos-duration="1500"
            data-aos-anchor-placement="top-bottom"
          >
            {value}
          </span>
        </div>

        <div>
          <p
            className="text-sm uppercase tracking-wider text-gray-300 mb-2"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-anchor-placement="top-bottom"
          >
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p
              className="text-xs text-gray-400"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
            >
              {description}
            </p>
            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  ),
);

const ActionLink = memo(
  ({ href, icon: Icon, label, variant = "primary", duration = 800 }) => (
    <a
      href={href}
      data-aos="fade-up"
      data-aos-duration={duration}
      className={`group relative min-w-0 flex-1 overflow-hidden rounded-xl border lg:w-auto lg:flex-none ${
        variant === "primary"
          ? "border-transparent shadow-[0_10px_30px_rgba(99,102,241,0.25)]"
          : "border-[#a855f7]/35"
      }`}
    >
      <span
        className={`absolute inset-0 ${
          variant === "primary"
            ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
            : "bg-white/[0.03] backdrop-blur-xl"
        }`}
      />
      <span
        className={`absolute inset-0 ${
          variant === "primary"
            ? "-translate-x-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[120%]"
            : "bg-[linear-gradient(120deg,rgba(99,102,241,0.0)_0%,rgba(99,102,241,0.12)_30%,rgba(168,85,247,0.18)_55%,rgba(255,255,255,0.08)_75%,rgba(255,255,255,0.0)_100%)] translate-x-[-115%] transition-transform duration-700 group-hover:translate-x-[115%]"
        }`}
      />
      {variant === "secondary" && (
        <>
          <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_left_center,rgba(99,102,241,0.16),transparent_36%),radial-gradient(circle_at_right_center,rgba(168,85,247,0.18),transparent_34%)]" />
          <span className="absolute inset-[1px] rounded-[11px] border border-[#a855f7]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </>
      )}
      <span className="relative flex w-full items-center justify-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 lg:w-auto lg:gap-2 lg:px-3.5 lg:py-2.5">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 sm:h-9 sm:w-9 lg:h-8 lg:w-8 ${
            variant === "primary"
              ? "border-white/20 bg-white/10 group-hover:scale-110 group-hover:-translate-y-0.5"
              : "border-[#a855f7]/30 bg-[#a855f7]/8 group-hover:border-[#a855f7]/55 group-hover:rotate-[10deg] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.28)]"
          }`}
        >
          <Icon
            className={`h-5 w-5 ${
              variant === "primary" ? "text-white" : "text-[#c084fc]"
            }`}
          />
        </span>
        <span
          className={`whitespace-nowrap text-sm font-semibold transition-transform duration-300 sm:text-base lg:text-[0.95rem] ${
            variant === "primary"
              ? "text-white group-hover:translate-x-0.5"
              : "text-[#c084fc] group-hover:translate-x-1 group-hover:text-[#d8b4fe]"
          }`}
        >
          {label}
        </span>
        <ArrowRight
          className={`h-3.5 w-3.5 transition-all duration-300 sm:h-4 sm:w-4 lg:h-3.5 lg:w-3.5 ${
            variant === "primary"
              ? "text-white/85 group-hover:translate-x-1"
              : "text-[#c084fc] group-hover:translate-x-1.5 group-hover:scale-110"
          }`}
        />
      </span>
    </a>
  ),
);

const AboutPage = () => {
  const { totalProjects, totalCertificates } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(
      localStorage.getItem("certificates") || "[]",
    );

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
    };
  }, []);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
      });
    };

    initAOS();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-[#6366f1] to-[#a855f7]",
        value: totalProjects,
        label: "Total Projects",
        description: "Innovative web solutions crafted",
        animation: "fade-right",
      },
      {
        icon: Award,
        color: "from-[#a855f7] to-[#6366f1]",
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills validated",
        animation: "fade-up",
      },
      {
        icon: Globe,
        color: "from-[#6366f1] to-[#a855f7]",
        value: profile.focusArea.value,
        label: profile.focusArea.label,
        description: profile.focusArea.description,
        animation: "fade-left",
      },
    ],
    [totalProjects, totalCertificates],
  );

  return (
    <div
      className="mt-10 h-auto overflow-hidden px-5 pb-[10%] text-white sm:px-8 lg:px-[10%]"
      id="About"
      itemScope
      itemType="https://schema.org/Person"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="w-full space-y-6 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I&apos;m
              </span>
              <span
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
                itemProp="name"
              >
                {profile.fullName}
              </span>
            </h2>

            <p
              className="max-w-2xl pb-5 text-left text-base leading-[1.85] tracking-[0.01em] text-gray-400 sm:pb-1 sm:text-lg lg:mx-0 lg:text-xl"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              {profile.aboutBio}
            </p>

            <div
              className="relative my-7 overflow-hidden rounded-2xl border border-gradient-to-r border-[#6366f1]/30 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#a855f7]/5 p-5 backdrop-blur-md shadow-2xl sm:p-6"
              data-aos="fade-up"
              data-aos-duration="1700"
            >
              <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-[#a855f7]/20 to-[#6366f1]/20 rounded-full blur-lg"></div>

              <div className="absolute top-3 left-4 text-[#6366f1] opacity-30">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              <blockquote className="relative z-10 pl-8 pr-3 text-center text-sm font-medium italic leading-[1.7] text-gray-300 lg:text-left sm:text-base">
                &quot;{profile.quote}&quot;
              </blockquote>
            </div>

            <div className="mx-auto flex w-full max-w-[460px] flex-row items-stretch gap-2.5 lg:mx-0 lg:max-w-none lg:items-start lg:gap-3 lg:px-0">
              <ActionLink
                href={`mailto:${profile.email}`}
                icon={Mail}
                label="Contact Me"
                variant="primary"
                duration={800}
              />
              <ActionLink
                href="#Portfolio"
                icon={Code}
                label="View Projects"
                variant="secondary"
                duration={1000}
              />
            </div>
          </div>

          <ProfileImage />
        </div>

        <a href="#Portfolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes spin-slower {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
