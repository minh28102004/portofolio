import { useEffect, useMemo, useState } from "react";

const getTechInitials = (language) => {
  const tokens = language
    .replace(/\./g, " ")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);

  const uppercaseToken = tokens.find(
    (token) => token === token.toUpperCase() && token.length <= 4,
  );

  if (uppercaseToken) {
    return uppercaseToken;
  }

  if (tokens.length === 1) {
    const [token] = tokens;
    return token.length <= 3
      ? token.toUpperCase()
      : token.slice(0, 2).toUpperCase();
  }

  return tokens
    .slice(0, 2)
    .map((token) => token[0].toUpperCase())
    .join("");
};

const TechStackIcon = ({ iconCandidates = [], Language }) => {
  const [iconIndex, setIconIndex] = useState(0);
  const [showFallback, setShowFallback] = useState(iconCandidates.length === 0);

  useEffect(() => {
    setIconIndex(0);
    setShowFallback(iconCandidates.length === 0);
  }, [iconCandidates]);

  const initials = useMemo(() => getTechInitials(Language), [Language]);
  const currentIcon = iconCandidates[iconIndex];

  const handleIconError = () => {
    if (iconIndex < iconCandidates.length - 1) {
      setIconIndex((prev) => prev + 1);
      return;
    }

    setShowFallback(true);
  };

  return (
    <div className="group flex min-h-[128px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl bg-slate-800/40 p-3 text-center shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-slate-700/45 hover:shadow-violet-500/10">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500/15 to-purple-500/20 opacity-0 blur-lg transition duration-300 group-hover:opacity-100" />
        {showFallback ? (
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#10172a] to-[#24143f] text-sm font-semibold tracking-[0.12em] text-violet-100 shadow-inner">
            {initials}
          </div>
        ) : (
          <img
            src={currentIcon}
            alt={`${Language} icon`}
            className="relative h-12 w-12 transform object-contain transition-transform duration-300 group-hover:scale-105 md:h-14 md:w-14"
            loading="lazy"
            onError={handleIconError}
          />
        )}
      </div>

      <span className="max-w-[11ch] break-words text-center text-[0.82rem] font-semibold leading-snug tracking-wide text-slate-300 transition-colors duration-300 group-hover:text-white md:text-sm">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon; 
