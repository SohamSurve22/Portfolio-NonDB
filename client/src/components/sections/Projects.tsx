import { useState, useMemo } from "react";
import { useProjects } from "@/hooks/use-portfolio";
import { Loader2, Folder, FileText, ChevronRight, Github, ExternalLink, ShieldAlert, Database, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@shared/schema";

interface ProjectsSectionProps {
  onCommand?: (cmd: string) => void;
}

export function ProjectsSection({ onCommand }: ProjectsSectionProps) {
  const { data: projects, isLoading, error } = useProjects();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const selectedProject = useMemo(() =>
    projects?.find(p => p.id === activeProjectId) || projects?.[0]
    , [projects, activeProjectId]);

  const handleProjectSelect = (id: string, title: string) => {
    setActiveProjectId(id);
    if (onCommand) {
      onCommand(`cd projects/${title.replace(/\s+/g, '-').toLowerCase()}`);
      onCommand(`cat README.md`);
    }
  };

  if (isLoading) return <div className="flex gap-2 items-center text-cyan-400 py-10 justify-center"><Loader2 className="animate-spin w-6 h-6" /> MOUNTING_FILESYSTEM...</div>;
  if (error) return <div className="text-red-400 p-4">FS_ERROR: Unable to read /mnt/projects</div>;
  if (!projects?.length) return <div className="text-cyan-400/50 p-4">Directory /mnt/projects is empty.</div>;

  return (
    <div className="flex flex-col md:flex-row h-[500px] border border-cyan-500/20 bg-black/40 overflow-hidden font-mono text-sm my-4">
      {/* Sidebar - Project Directory */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-cyan-500/20 flex flex-col bg-black/20">
        <div className="p-3 bg-cyan-500/5 border-b border-cyan-500/10 flex items-center justify-between">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Directory: /projects</span>
          <span className="text-[10px] text-cyan-500/40">{projects.length} Total</span>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectSelect(project.id, project.title)}
              className={`w-full text-left p-2 rounded flex items-center gap-2 group transition-all ${activeProjectId === project.id || (!activeProjectId && project === projects[0])
                ? "bg-cyan-500/20 text-cyan-300"
                : "text-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400"
                }`}
            >
              <Folder size={14} className={activeProjectId === project.id ? "text-cyan-300" : "text-cyan-500/30 group-hover:text-cyan-400"} />
              <span className="truncate flex-1">{project.title}</span>
              <ChevronRight size={12} className={`transition-transform ${activeProjectId === project.id ? "rotate-90" : "opacity-0 group-hover:opacity-100"}`} />
            </button>
          ))}
        </div>
        <div className="p-2 border-t border-cyan-500/10 italic text-[10px] text-cyan-500/30">
          TIP: Use 'cd' in terminal to explore
        </div>
      </div>

      {/* Content Area - Project Metadata */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 bg-gradient-to-br from-transparent to-cyan-500/[0.03]">
        <AnimatePresence mode="wait">
          {selectedProject && (
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="border-b border-cyan-500/20 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-techno font-bold text-cyan-300 tracking-wider">
                    {selectedProject.title.toUpperCase()}
                  </h2>
                  <div className="flex gap-2">
                    {selectedProject.repoUrl && (
                      <a href={selectedProject.repoUrl} target="_blank" className="p-1.5 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 rounded transition-all">
                        <Github size={16} />
                      </a>
                    )}
                    {selectedProject.demoUrl && (
                      <a href={selectedProject.demoUrl} target="_blank" className="p-1.5 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 rounded transition-all">
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map(tech => (
                    <span key={tech} className="text-[10px] bg-cyan-900/30 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="flex items-center gap-2 text-[10px] text-purple-400 font-bold uppercase mb-2 tracking-widest">
                      <FileText size={12} /> Objective
                    </h4>
                    <p className="text-cyan-400/80 leading-relaxed text-xs">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-[10px] text-red-400 font-bold uppercase mb-2 tracking-widest">
                      <ShieldAlert size={12} /> Threat Model
                    </h4>
                    <div className="p-3 bg-red-400/5 border border-red-400/20 rounded text-[11px] text-red-200/70">
                      Vulnerability assessment: LOW_RISK // Encryption: AES-256-GCM enforced // Protocol: TLS 1.3
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="flex items-center gap-2 text-[10px] text-cyan-400 font-bold uppercase mb-2 tracking-widest">
                      <Database size={12} /> Architecture
                    </h4>
                    <div className="space-y-2">
                      <div className="p-2 border border-cyan-500/10 flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold text-xs ring-1 ring-cyan-500/20">DB</div>
                        <div className="text-[10px] text-cyan-500/60 uppercase">Persistence: NoSQL Cluster</div>
                      </div>
                      <div className="p-2 border border-cyan-500/10 flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold text-xs ring-1 ring-cyan-500/20">UI</div>
                        <div className="text-[10px] text-cyan-500/60 uppercase">Interface: Reactive HUD</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-[10px] text-orange-400 font-bold uppercase mb-2 tracking-widest">
                      <Cpu size={12} /> System Artifacts
                    </h4>
                    <ul className="text-[10px] text-cyan-500/40 space-y-1">
                      <li className="flex items-center gap-2 hover:text-cyan-300 transition-colors cursor-pointer">
                        <ChevronRight size={10} /> SYSTEM_ARCHITECTURE.PDF (v1.2)
                      </li>
                      <li className="flex items-center gap-2 hover:text-cyan-300 transition-colors cursor-pointer">
                        <ChevronRight size={10} /> VULN_REPORT_Q4.MD
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
