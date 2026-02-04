import { ReactNode } from "react";
import { motion } from "framer-motion";

interface TerminalOutputProps {
  children: ReactNode;
  timestamp?: boolean;
}

export function TerminalOutput({ children, timestamp = false }: TerminalOutputProps) {
  const time = new Date().toLocaleTimeString();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-2 font-mono text-cyan-400/90 break-words whitespace-pre-wrap"
    >
      {timestamp && <span className="text-cyan-600/50 mr-2">[{time}]</span>}
      {children}
    </motion.div>
  );
}

export function CommandEcho({ command, path = "~" }: { command: string, path?: string }) {
  return (
    <div className="flex items-center text-cyan-500/50 mb-1 text-sm">
      <span className="text-purple-400/60 mr-1">guest</span>
      <span className="text-cyan-400/40 mr-1">@</span>
      <span className="text-cyan-400/60 mr-1 font-techno">portfolio</span>
      <span className="text-cyan-400/40 mr-2">{path === "/" ? "~" : path}$</span>
      <span className="text-cyan-300/80">{command}</span>
    </div>
  );
}

export function ErrorOutput({ message }: { message: string }) {
  return (
    <div className="text-red-400 mb-2 flex items-center gap-2">
      <span className="text-red-500 font-bold">ERROR:</span>
      <span>{message}</span>
    </div>
  );
}

export function SuccessOutput({ message }: { message: string }) {
  return (
    <div className="text-green-400 font-bold mb-2 flex items-center gap-2">
      <span className="text-green-300">SUCCESS:</span>
      <span>{message}</span>
    </div>
  );
}
