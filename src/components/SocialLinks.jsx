import { useEffect } from "react";
import { Code2, ExternalLink, Mail } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { profile } from "../data/profile";

const quickLinks = [
  {
    name: "Email",
    displayName: "Send an email",
    subText: profile.email,
    icon: Mail,
    url: `mailto:${profile.email}`,
    color: "#60A5FA",
    gradient: "from-[#2563EB] to-[#7C3AED]",
  },
  {
    name: "Projects",
    displayName: "View projects",
    subText: "Explore selected work and highlights",
    icon: Code2,
    url: "#Portfolio",
    color: "#A855F7",
    gradient: "from-[#7C3AED] to-[#DB2777]",
  },
];

const LinkCard = ({ link, delay = 0 }) => {
  const Icon = link.icon;
  const isExternal = link.url.startsWith("mailto:");

  return (
    <a
      href={link.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group relative flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${link.gradient}`}
      />

      <div className="relative flex items-center gap-4 min-w-0">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-20 rounded-md transition-all duration-500 group-hover:scale-110 group-hover:opacity-30"
            style={{ backgroundColor: link.color }}
          />
          <div className="relative p-2 rounded-md">
            <Icon
              className="w-5 h-5 transition-all duration-500 group-hover:scale-105"
              style={{ color: link.color }}
            />
          </div>
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-sm sm:text-base font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
            {link.displayName}
          </span>
          <span className="text-xs sm:text-sm text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">
            {link.subText}
          </span>
        </div>
      </div>

      <ExternalLink className="relative w-4 h-4 text-gray-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-1" />

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>
    </a>
  );
};

const SocialLinks = () => {
  useEffect(() => {
    AOS.init({
      offset: 10,
    });
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 py-8 backdrop-blur-xl">
      <h3
        className="text-xl font-semibold text-white mb-6 flex items-center gap-2"
        data-aos="fade-down"
      >
        <span className="inline-block w-8 h-1 bg-indigo-500 rounded-full"></span>
        Quick Links
      </h3>

      <div className="flex flex-col gap-4">
        {quickLinks.map((link, index) => (
          <LinkCard key={link.name} link={link} delay={100 + index * 100} />
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
