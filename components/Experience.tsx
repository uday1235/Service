import React from "react";

import { workExperience } from "@/data";

const Experience = () => {
  return (
    <section className="w-full py-24" id="experience">
      <div className="mb-12 flex flex-col items-center justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300 md:text-left">
            Career history
          </p>
          <h2 className="text-center text-4xl font-bold text-white md:text-left md:text-5xl">
            Work <span className="text-purple">experience</span>
          </h2>
        </div>
        <p className="font-mono text-sm text-white/45">
          0{workExperience.length} roles
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {workExperience.map((card, index) => (
          <article
            key={card.id}
            className="group relative flex min-h-52 items-start gap-5 overflow-hidden rounded-lg border border-white/10 bg-[#080b1b] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 md:p-8"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
              <img
                src={card.thumbnail}
                alt={`${card.title} logo`}
                className="h-9 w-9 object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-cyan-300/80">
                  0{index + 1}
                </span>
                <span className="h-px flex-1 bg-white/10" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Experience
                </span>
              </div>
              <h3 className="text-lg font-semibold leading-snug text-white md:text-xl">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/60">
                {card.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
