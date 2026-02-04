import { useSkills } from "@/hooks/use-portfolio";
import { Loader2, ShieldCheck, Cpu, Code2, Globe, Settings2 } from "lucide-react";
import { motion } from "framer-motion";

const getProficiencyLabel = (p: number) => {
  if (p >= 5) return "ADVANCED";
  if (p >= 3) return "INTERMEDIATE";
  return "BEGINNER";
};

const getCategoryIcon = (cat: string) => {
  const c = cat.toLowerCase();
  if (c.includes("security") || c.includes("offensive") || c.includes("defensive")) return ShieldCheck;
  if (c.includes("frontend") || c.includes("backend") || c.includes("dev")) return Code2;
  if (c.includes("system") || c.includes("internal")) return Cpu;
  if (c.includes("cloud") || c.includes("network")) return Globe;
  return Settings2;
};

export function SkillsSection() {
  const { data: skills, isLoading, error } = useSkills();

  if (isLoading) return <div className="flex gap-2 items-center text-cyan-400 py-10 justify-center"><Loader2 className="animate-spin w-6 h-6" /> ANALYZING_SKILL_MATRIX...</div>;
  if (error) return <div className="text-red-400 p-4 border border-red-500/20 bg-red-500/5">ACCESS_DENIED: Skills database unreachable.</div>;
  if (!skills) return null;

  // Group by category but mapped to the required "Layers"
  const layers = [
    { title: "SYSTEMS & INTERNALS", categories: ["Systems", "Internals", "Kernel", "Hardware"] },
    { title: "SECURITY DOMAINS", categories: ["Security", "Offensive", "Defensive", "Cryptography"] },
    { title: "LANGUAGES & CORE", categories: ["Languages", "Backend"] },
    { title: "FRAMEWORKS & LIBRARIES", categories: ["Frontend", "Frameworks"] },
    { title: "TOOLS & PLATFORMS", categories: ["Tools", "Cloud", "Network", "Platforms"] }
  ];

  return (
    <div className="space-y-8 py-4 font-mono">
      {layers.map((layer, layerIdx) => {
        const layerSkills = skills.filter(s =>
          layer.categories.some(c => s.category.toLowerCase().includes(c.toLowerCase()))
        );

        if (layerSkills.length === 0) return null;

        return (
          <motion.div
            key={layer.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: layerIdx * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-cyan-500/20" />
              <h3 className="text-cyan-300 font-bold uppercase text-[10px] tracking-[0.3em] font-techno whitespace-nowrap">
                LAYER_{layerIdx + 1}: {layer.title}
              </h3>
              <div className="h-px w-12 bg-cyan-500/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {layerSkills.map((skill) => {
                const Icon = getCategoryIcon(skill.category);
                const label = getProficiencyLabel(skill.proficiency || 0);

                return (
                  <div key={skill.id} className="group relative bg-[#0a0a0f] border border-cyan-500/10 p-3 hover:border-cyan-500/30 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Icon size={14} className="text-cyan-500/40 group-hover:text-cyan-400 transition-colors" />
                        <span className="text-cyan-300 font-bold text-xs uppercase group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 border ${label === "ADVANCED" ? "border-green-500/50 text-green-400" :
                          label === "INTERMEDIATE" ? "border-cyan-500/50 text-cyan-400" :
                            "border-purple-500/50 text-purple-400"
                        }`}>
                        {label}
                      </span>
                    </div>

                    <div className="mt-3 flex gap-0.5 h-1">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 transition-all duration-500 ${i < (skill.proficiency || 0) * 2.4
                              ? label === "ADVANCED" ? 'bg-green-500' : 'bg-cyan-500'
                              : 'bg-cyan-950/30'
                            }`}
                        />
                      ))}
                    </div>

                    <div className="mt-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] text-cyan-500/40">EVIDENCE: VALIDATED</span>
                      <span className="text-[8px] text-purple-400/60 font-bold uppercase tracking-tighter">PROJECT_SRC_ENABLED</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
