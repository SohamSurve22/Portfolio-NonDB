import { useState, useRef, useEffect, useMemo, ReactNode } from "react";
import { TerminalPrompt } from "@/components/TerminalPrompt";
import { TerminalOutput, CommandEcho, ErrorOutput } from "@/components/TerminalOutput";
import { AsciiHeader } from "@/components/AsciiArt";
import { BootSequence } from "@/components/BootSequence";
import { Background } from "@/components/Background";
import { SystemSidebar } from "@/components/SystemSidebar";
import { NavigationDock } from "@/components/NavigationDock";
import { DetailOverlay } from "@/components/DetailOverlay";
import { motion } from "framer-motion";
import { useFileSystem, FSNode } from "@/hooks/useFileSystem";
import { projects as projectData, skills as skillsData, experience as experienceData, certifications as certData } from "@/lib/data";
import { commandRegistry, CommandContext } from "@/components/commandRegistry";

type LogEntry = {
  id: string;
  type: "command" | "output" | "component";
  content: React.ReactNode;
};

type OverlayState = {
  title: string;
  type: "folder" | "file" | "system";
  content: ReactNode;
};

const slug = (s: string) => s.replace(/[^\w]+/g, "-").replace(/^-|-$/g, "").toLowerCase();

const INITIAL_FS: FSNode[] = [
  {
    name: "projects",
    type: "directory",
    children: projectData.map(p => ({
      name: slug(p.title),
      type: "directory",
      children: [
        {
          name: "README.md",
          type: "file",
          content: `${p.title.toUpperCase()}\n\n${p.description}\n\nTech: ${p.techStack?.join(", ") || ""}\nRepo: ${p.repoUrl || ""}\nDemo: ${p.demoUrl || ""}`
        }
      ]
    }))
  },
  {
    name: "skills",
    type: "directory",
    children: skillsData.map(s => ({
      name: `${slug(s.name)}.skill`,
      type: "file",
      content: `${s.name} (${s.category})\nProficiency: ${'▇'.repeat(s.proficiency)}${'▁'.repeat(5 - s.proficiency)}`
    }))
  },
  {
    name: "experience",
    type: "directory",
    children: experienceData.map((e, idx) => ({
      name: `${slug(e.role)}-${idx + 1}.md`,
      type: "file",
      content: `${e.role} @ ${e.company}\n${e.duration}\n\n${e.description}`
    }))
  },
  {
    name: "certificates",
    type: "directory",
    children: certData.map(c => ({
      name: `${slug(c.name)}.txt`,
      type: "file",
      content: `${c.name} — ${c.issuer}\n${c.date}\n\n${c.description}\n\nPDF: ${c.pdfUrl}`
    }))
  },
  { name: "contact.exe", type: "file", content: "Run 'contact' to initialize secure handshake." },
  { name: "about.txt", type: "file", content: "Soham Surve |Cybersecurity Research Engineer\nResearches the convergence of artificial intelligence and security operations\nDevelops resilient systems, analyzes adversarial behavior, and advances AI-based detection and response" },
  { name: "root_access.log", type: "file", content: "LAST LOGIN: 2026-02-03 15:47:01 from 192.XXX.22.04\n\nNo intrusions detected in past 24 hours." }
];

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [lastExecutedCommand, setLastExecutedCommand] = useState<string>();
  const [overlay, setOverlay] = useState<OverlayState | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fs = useFileSystem(INITIAL_FS);

  useEffect(() => {
    if (booted && logs.length === 0) {
      setLogs([
        {
          id: "init",
          type: "output",
          content: (
            <div className="space-y-2">
              <div className="text-cyan-300 font-techno text-lg border-b border-cyan-500/20 pb-1">PORTFOLIO_OS [Version 2.0.42]</div>
              <div className="text-cyan-500/60 font-mono text-xs">Connection established via SECURE_SHELL // IP: 127.0.0.1</div>
              <div className="bg-cyan-500/10 p-2 border-l-2 border-cyan-500 mt-4 text-sm">
                <p className="text-cyan-300 font-bold mb-1">SYSTEM_GUIDANCE:</p>
                <p>• Use the <span className="text-white font-bold">GUI Dock</span> below or type commands</p>
                <p>• Type <span className="text-white font-bold">skills --matrix</span> for technical proficiency</p>
                <p>• Type <span className="text-white font-bold">help</span> to trigger Manual</p>
                <p className="mt-2 text-[10px] text-cyan-500/40 italic">Note: Technical depth is preserved in detailed overlays.</p>
              </div>
            </div>
          ),
        },
      ]);
    }
  }, [booted, logs.length]);

  useEffect(() => {
    if (booted) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, booted]);

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    if (raw.toLowerCase() === "exit" && overlay) {
      setOverlay(null);
      return;
    }

    const parts = raw.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    setHistory((prev) => [...prev, raw]);
    setLastExecutedCommand(raw);

    const newLogs: LogEntry[] = [
      ...logs,
      { id: Date.now().toString() + "-cmd", type: "command", content: raw },
    ];

    const context: CommandContext = {
      currentPath: fs.currentPath,
      fs: fs,
      setLogs: setLogs,
      setOverlay: (title, type, content) => setOverlay({ title, type, content }),
      onCommand: handleCommand,
      history: history
    };

    if (commandRegistry[cmd]) {
      const output = commandRegistry[cmd](args, context);
      if (output) {
        newLogs.push({
          id: Date.now().toString(),
          type: output.toString().includes("component") ? "component" : "output",
          content: output,
        });
      }
    } else {
      newLogs.push({
        id: Date.now().toString(),
        type: "output",
        content: <ErrorOutput message={`COMMAND_NOT_FOUND: ${cmd}.`} />,
      });
    }

    if (cmd !== "clear") {
      setLogs(newLogs);
    }
  };

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-cyan-400 font-mono relative selection:bg-cyan-500 selection:text-black overflow-hidden font-mono">
      <Background />
      <div className="fixed inset-0 pointer-events-none z-50 crt opacity-30" />
      <div className="fixed inset-0 pointer-events-none z-50 scan-line" />

      {/* GUI Navigation Layer */}
      <NavigationDock onCommand={handleCommand} />

      {/* Universal Overlay System */}
      <DetailOverlay
        isOpen={!!overlay}
        onClose={() => setOverlay(null)}
        title={overlay?.title || ""}
        type={overlay?.type || "system"}
      >
        {overlay?.content}
      </DetailOverlay>

      {/* Main Terminal Area */}
      <div className="flex-grow relative z-10 flex flex-col min-w-0">
        <div className="flex-grow p-4 md:p-8 lg:p-10 overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl">
            <AsciiHeader />
            <div className="space-y-4 pb-32">
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {log.type === "command" ? (
                    <CommandEcho command={log.content as string} path={fs.currentPath} />
                  ) : log.type === "component" ? (
                    <div className="my-4 border-l border-cyan-500/20 bg-cyan-500/5 p-4 rounded-r-md">
                      {log.content}
                    </div>
                  ) : (
                    <TerminalOutput>{log.content}</TerminalOutput>
                  )}
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>
        </div>

        {/* Prompt */}
        <div className="p-4 bg-black/60 backdrop-blur-md border-t border-cyan-500/20 relative z-20">
          <div className="max-w-4xl">
            <TerminalPrompt
              onCommand={handleCommand}
              history={history}
              path={fs.currentPath}
            />
          </div>
        </div>
      </div>

      {/* Persistent Status Panel - Hidden on mobile */}
      <div className="hidden lg:block">
        <SystemSidebar
          lastCommand={lastExecutedCommand}
          currentDir={fs.currentPath}
        />
      </div>
    </div>
  );
}

