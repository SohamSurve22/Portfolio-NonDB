import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Terminal } from "lucide-react";

interface DetailOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type?: "folder" | "file" | "system";
  children: ReactNode;
}

export function DetailOverlay({ isOpen, onClose, title, type = "system", children }: DetailOverlayProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-16 z-[101] flex flex-col bg-[#0a0a0f] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,255,255,0.1)] overflow-hidden"
          >
            {/* Header / HUD Bar */}
            <div className="flex items-center justify-between p-3 border-b border-cyan-500/20 bg-cyan-500/5 select-none">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5 px-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50 hover:bg-red-500 cursor-pointer transition-colors" onClick={onClose} />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="h-4 w-px bg-cyan-500/20" />
                <div className="flex items-center gap-2">
                  {type === "folder" ? <Terminal size={14} className="text-purple-400" /> : <Maximize2 size={14} className="text-cyan-400" />}
                  <h2 className="font-techno text-sm text-cyan-300 font-bold uppercase tracking-widest leading-none">
                    {title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-cyan-500/40 font-mono hidden md:block">TYPE: {type.toUpperCase()} // STATUS: READ_ONLY</span>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/10 rounded transition-colors text-cyan-400"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-gradient-to-br from-transparent to-cyan-500/[0.02]">
              <div className="max-w-5xl mx-auto h-full">
                {children}
              </div>
            </div>

            {/* Footer / Status */}
            <div className="p-2 border-t border-cyan-500/10 bg-black/40 text-[9px] text-cyan-600 font-mono flex justify-between items-center px-4">
              <div className="flex gap-4">
                <span>OS: PORTFOLIO_CORE_V2</span>
                <span className="hidden sm:inline">PATH: /SYS/OVERLAY/{title.replace(/\s+/g, '_').toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                <span>SECURE_CONNECTION_STABLE</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
