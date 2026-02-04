import { useState } from "react";
import { useExperience } from "@/hooks/use-portfolio";
import { Loader2, Briefcase, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Experience } from "@shared/schema";

export function ExperienceSection() {
  const { data: experiences, isLoading, error } = useExperience();
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  if (isLoading) return <div className="flex gap-2 items-center text-cyan-400"><Loader2 className="animate-spin w-4 h-4" /> Retrieving employment history...</div>;
  if (error) return <div className="text-red-400">Failed to access HR database.</div>;
  if (!experiences) return null;

  return (
    <>
      <div className="relative font-mono my-4 space-y-6">
        {experiences.map((job, idx) => (
          <motion.div
            key={job.id}
            className="border-l-2 border-cyan-500/20 pl-6 relative group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15 }}
            onClick={() => setSelectedExp(job)}
          >
            <div className="absolute -left-[9px] top-1 w-4 h-4 bg-[#0a0a0f] border border-cyan-500 rounded-sm" />

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                <span className="text-purple-400 font-bold text-xs">[{job.duration}]</span>
                <h3 className="text-cyan-300 font-bold text-sm uppercase tracking-wide">{job.role}</h3>
              </div>
              <h4 className="text-cyan-500/60 font-bold text-xs italic">@{job.company.toUpperCase()}</h4>

              <div className="mt-2 text-cyan-200/80 text-[11px] leading-relaxed max-w-2xl border-t border-cyan-500/5 pt-2">
                {job.description.split('\n')[0]}...
              </div>

              <div className="mt-2 text-[9px] text-cyan-500/30 uppercase tracking-widest flex gap-4">
                <span>Status: COMPLETED</span>
                <span>Security_Clearance: YES</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedExp && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-8 md:inset-16 lg:inset-24 z-50 cyber-border bg-[#0a0a0f]/95 backdrop-blur-md overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-cyan-700/30">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <h2 className="font-techno text-lg text-cyan-300 tracking-wide">
                    EMPLOYMENT_RECORD.exe
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedExp(null)}
                  className="p-2 hover:bg-cyan-500/10 transition-colors text-cyan-400 hover:text-cyan-300"
                  data-testid="button-close-exp"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-500/30">
                      <Briefcase className="w-12 h-12 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-techno text-2xl text-cyan-300">{selectedExp.role}</h3>
                      <p className="text-purple-400 font-display text-lg">@{selectedExp.company}</p>
                      <p className="text-cyan-400/60 font-mono text-sm">{selectedExp.duration}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-black/30 border border-cyan-700/30 rounded">
                    <h4 className="text-xs font-techno text-purple-400 uppercase tracking-wider mb-3">Responsibilities & Achievements</h4>
                    <p className="text-cyan-400/80 font-display leading-relaxed whitespace-pre-wrap">{selectedExp.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-cyan-700/30 text-xs text-cyan-600 font-mono flex justify-between">
                <span>Press ESC or click outside to close</span>
                <span className="text-purple-400">ID: EMP_{selectedExp.id.toString().padStart(4, '0')}</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
