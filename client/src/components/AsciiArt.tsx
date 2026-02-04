import { memo } from "react";
import { motion } from "framer-motion";

export const AsciiHeader = memo(() => {
  return (
    <div className="mb-6 select-none border-b border-cyan-500/10 pb-4">
      <div className="flex justify-between items-baseline mb-2">
        <motion.h1
          className="font-techno text-2xl font-bold tracking-[0.2em] text-cyan-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          SOHAM_CORE_OS
        </motion.h1>
        <span className="text-[10px] font-mono text-cyan-600/50">BUILD: v2.0-STABLE // REVISION: 0508</span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-cyan-500/40">
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
          DATACENTER: Mumbai Asia-SOUTH-22
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 bg-cyan-500 rounded-full" />
          CONNECTION: ENC_TLS_1.3
        </div>
        <div className="flex items-center gap-2 justify-self-end">
          SECURITY_LEVEL: Guest Alpha
        </div>
      </div>
    </div>
  );
});
