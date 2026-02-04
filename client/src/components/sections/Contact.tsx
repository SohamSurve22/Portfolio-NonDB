import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <div className="max-w-xl my-4">
      <p className="mb-6 text-cyan-400/50 text-sm font-mono">
        // Connect via external network nodes. <br />
        // Secure channels established.
      </p>

      {/* Social Links Section */}
      <div className="p-4 cyber-border bg-gradient-to-br from-cyan-900/10 to-purple-900/10">
        <p className="text-xs uppercase text-purple-400 font-bold font-techno tracking-wider mb-3">
          External Network Nodes
        </p>
        <div className="flex gap-3">
          <motion.a
            href="https://github.com/SohamSurve22/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 p-3 bg-black/50 border border-cyan-700/50 hover:border-cyan-400 hover:bg-cyan-900/20 transition-all group"
          >
            <Github className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
            <span className="text-cyan-300 font-mono text-sm group-hover:text-cyan-200">GitHub</span>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/soham-surve-a98606223/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 p-3 bg-black/50 border border-purple-700/50 hover:border-purple-400 hover:bg-purple-900/20 transition-all group"
          >
            <Linkedin className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
            <span className="text-purple-300 font-mono text-sm group-hover:text-purple-200">LinkedIn</span>
          </motion.a>
        </div>
      </div>
    </div>
  );
}
