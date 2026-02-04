import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootLines = [
    { text: "BIOS Date 02/02/26 15:23:01 Ver: 2.0.26", type: "system" },
    { text: "CPU: Neural Processing Unit v4.0 @ 12.00GHz", type: "system" },
    { text: "Quantum Memory Test: 256TB OK", type: "success" },
    { text: "Initializing Cyber Security Protocols...", type: "process" },
    { text: "Loading Neural Kernel...", type: "process" },
    { text: "Mounting encrypted file system...", type: "process" },
    { text: "Scanning for intrusion attempts... CLEAR", type: "success" },
    { text: "Network interface initialized: eth0 [SECURE]", type: "success" },
    { text: "IP Address: 192.168.1.105 [MASKED]", type: "system" },
    { text: "Initializing Portfolio Interface...", type: "process" },
    { text: "Loading user profile: guest", type: "system" },
    { text: "Starting system services...", type: "process" },
    { text: "SYSTEM READY", type: "ready" },
  ];

  useEffect(() => {
    let delay = 500;

    bootLines.forEach((line, index) => {
      const lineDelay = Math.random() * 200 + 80;
      delay += lineDelay;

      setTimeout(() => {
        setLines((prev) => [...prev, line.text]);
        setProgress(Math.round(((index + 1) / bootLines.length) * 100));

        if (index === bootLines.length - 1) {
          setTimeout(onComplete, 600);
        }
      }, delay);
    });
  }, [onComplete]);

  const getLineColor = (line: string) => {
    if (line.includes("OK") || line.includes("CLEAR") || line.includes("SECURE") || line.includes("SUCCESS")) {
      return "text-green-400";
    }
    if (line.includes("READY")) {
      return "text-cyan-300 font-bold neon-text";
    }
    if (line.includes("...")) {
      return "text-purple-400";
    }
    return "text-cyan-400/80";
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] z-50 p-6 md:p-8 font-mono text-cyan-400 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-cyan-900/10" />

      <div className="relative max-w-3xl mx-auto space-y-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-center"
        >
          <h1 className="font-techno text-2xl md:text-4xl text-cyan-400 neon-text tracking-wider">
            PORTFOLIO OS
          </h1>
          <p className="text-xs text-purple-400/60 tracking-widest mt-1">SYSTEM INITIALIZATION</p>
        </motion.div>

        <div className="mb-4 h-1 bg-cyan-900/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="space-y-1 text-sm">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`flex items-center gap-2 ${getLineColor(line)}`}
            >
              <span className="text-cyan-600/50 text-xs w-16 shrink-0">
                [{new Date().toLocaleTimeString()}]
              </span>
              <span className="text-purple-500">{">"}</span>
              <span>{line}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="w-3 h-5 bg-cyan-400 inline-block mt-4"
          style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)' }}
        />
      </div>

      <div className="fixed inset-0 pointer-events-none crt" />
    </div>
  );
}
