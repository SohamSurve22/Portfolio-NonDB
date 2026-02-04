import React from "react";
import { motion } from "framer-motion";
import { SuccessOutput, ErrorOutput } from "./TerminalOutput";
import { ProjectsSection } from "./sections/Projects";
import { SkillsSection } from "./sections/Skills";
import { ExperienceSection } from "./sections/Experience";
import { CertificationsSection } from "./sections/Certifications";
import { ContactSection } from "./sections/Contact";
import { ProfileSection } from "./sections/Profile";

export type CommandContext = {
    currentPath: string;
    fs: any;
    setLogs: React.Dispatch<React.SetStateAction<any[]>>;
    setOverlay: (title: string, type: "folder" | "file" | "system", content: React.ReactNode) => void;
    onCommand: (cmd: string) => void;
    history: string[];
};

export const commandRegistry: Record<string, (args: string[], ctx: CommandContext) => React.ReactNode | void> = {
    help: () => (
        <div className="grid grid-cols-[140px_1fr] gap-2 text-sm font-mono">
            <span className="text-cyan-300 font-bold">whoami</span>
            <span className="text-cyan-400/60">System user profile</span>
            <span className="text-cyan-300 font-bold">ls [path]</span>
            <span className="text-cyan-400/60">List directory contents</span>
            <span className="text-cyan-300 font-bold">cd [dir]</span>
            <span className="text-cyan-400/60">Change working directory</span>
            <span className="text-cyan-300 font-bold">cat [file]</span>
            <span className="text-cyan-400/60">Read file content</span>
            <span className="text-cyan-300 font-bold">skills --matrix</span>
            <span className="text-cyan-400/60">Technical proficiency matrix</span>
            <span className="text-cyan-300 font-bold">experience</span>
            <span className="text-cyan-400/60">View professional history</span>
            <span className="text-cyan-300 font-bold">contact</span>
            <span className="text-cyan-400/60">Secure communication channel</span>
            <span className="text-cyan-300 font-bold">analyze [target]</span>
            <span className="text-cyan-400/60">Run security analysis (malware, traffic)</span>
            <span className="text-cyan-300 font-bold">threat-model</span>
            <span className="text-cyan-400/60">Project vulnerability assessment</span>
            <span className="text-cyan-300 font-bold">system status</span>
            <span className="text-cyan-400/60">Global system telemetry</span>
            <span className="text-cyan-300 font-bold">clear</span>
            <span className="text-cyan-400/60">Flush terminal buffer</span>
        </div>
    ),

    ls: (args, ctx) => {
        const items = ctx.fs.ls(args[0]);
        if (!items) return <ErrorOutput message="Directory not found" />;
        return (
            <div className="flex flex-wrap gap-4 mt-1 font-mono">
                {items.map((item: any) => (
                    <span key={item.name} className={item.type === "directory" ? "text-purple-400 font-bold" : "text-cyan-300"}>
                        {item.name}{item.type === "directory" ? "/" : ""}
                    </span>
                ))}
            </div>
        );
    },

    cd: (args, ctx) => {
        if (!args[0]) return;
        const success = ctx.fs.cd(args[0]);
        if (!success) return <ErrorOutput message={`No such directory: ${args[0]}`} />;
    },

    cat: (args, ctx) => {
        if (!args[0]) return <ErrorOutput message="Usage: cat [filename]" />;
        const content = ctx.fs.cat(args[0]);
        if (!content) return <ErrorOutput message={`File not found: ${args[0]}`} />;
        return <div className="mt-2 text-cyan-200 leading-relaxed font-mono whitespace-pre-wrap">{content}</div>;
    },

    open: (args, ctx) => {
        const target = args[0]?.toLowerCase();
        if (target === "projects") {
            ctx.setOverlay("Research Projects", "folder", <ProjectsSection onCommand={ctx.onCommand} />);
            return <SuccessOutput message="MOUNTING_PROJECT_DATABASE" />;
        }
        if (target === "skills") {
            ctx.setOverlay("Technical Proficiency Matrix", "system", <SkillsSection />);
            return <SuccessOutput message="LOADING_SKILL_LAYERS" />;
        }
        if (target === "experience") {
            ctx.setOverlay("Professional History", "file", <ExperienceSection />);
            return <SuccessOutput message="LOADING_EMPLOYMENT_RECORDS" />;
        }
        if (target === "certs" || target === "certifications") {
            ctx.setOverlay("Validated Credentials", "file", <CertificationsSection />);
            return <SuccessOutput message="VERIFYING_SECURE_CERTIFICATES" />;
        }
        if (target === "contact") {
            ctx.setOverlay("Secure Communication Handshake", "system", <ContactSection />);
            return <SuccessOutput message="ESTABLISHING_TLS_LINK" />;
        }
        return <ErrorOutput message={`Unable to open ${target}. Try 'ls' for list.`} />;
    },

    whoami: (args, ctx) => {
        ctx.setOverlay("User Identity", "system", <ProfileSection />);
        return <SuccessOutput message="IDENTITY_VERIFIED" />;
    },

    skills: (args, ctx) => {
        if (args.includes("--matrix")) {
            ctx.setOverlay("Technical Proficiency Matrix", "system", <SkillsSection />);
            return <SuccessOutput message="LOADING_SKILL_LAYERS" />;
        }
        ctx.setOverlay("Technical Proficiency Matrix", "system", <SkillsSection />);
        return <SuccessOutput message="LOADING_SKILL_LAYERS" />;
    },

    projects: (args, ctx) => {
        ctx.setOverlay("Research Projects", "folder", <ProjectsSection onCommand={ctx.onCommand} />);
        return <SuccessOutput message="MOUNTING_PROJECT_DATABASE" />;
    },

    analyze: (args) => {
        const target = args[0] || "system";
        return (
            <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2 text-yellow-500 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span>INITIATING HEURISTIC SCAN ON: {target.toUpperCase()}</span>
                </div>
                <div className="font-mono text-[10px] text-cyan-400/60 grid grid-cols-1 gap-1">
                    <p>[ OK ] Loading analysis engine v4.2.0...</p>
                    <p>[ OK ] Unpacking byte streams...</p>
                    <p>[ WARN ] Entropy detected: 7.84 (High probability of obfuscation)</p>
                    <p>[ INFO ] Binary signature match found: COBALT_STRIKE_IMP_04</p>
                    <SuccessOutput message="ANALYSIS COMPLETE. VULNERABILITY DETECTED: BUFFER_OVERFLOW_0x21" />
                </div>
            </div>
        );
    },

    "threat-model": () => (
        <div className="border border-red-500/30 bg-red-500/5 p-4 mt-2 space-y-3">
            <h3 className="text-red-400 font-bold flex items-center gap-2">
                <span className="animate-ping w-2 h-2 rounded-full bg-red-400" /> THREAT_MODEL: SECURE_VAULT_PROJECT
            </h3>
            <div className="grid grid-cols-3 gap-4 text-[10px] font-mono">
                <div className="p-2 border border-red-500/20">
                    <p className="text-red-500 font-bold mb-1">STRIDE</p>
                    <p className="text-cyan-400/70">Spoofing: HIGH</p>
                    <p className="text-cyan-400/70">Tampering: LOW</p>
                </div>
                <div className="p-2 border border-red-500/20">
                    <p className="text-red-500 font-bold mb-1">DREAD</p>
                    <p className="text-cyan-400/70">Damage: 9/10</p>
                    <p className="text-cyan-400/70">Reproduced: 4/10</p>
                </div>
                <div className="p-2 border border-red-500/20">
                    <p className="text-red-500 font-bold mb-1">MITIGATION</p>
                    <p className="text-cyan-400/70">AES-256-GCM</p>
                    <p className="text-cyan-400/70">TOTP Auth</p>
                </div>
            </div>
        </div>
    ),

    "trace-packet": (args) => {
        const target = args[0] || "8.8.8.8";
        return (
            <div className="space-y-1 font-mono text-[10px] text-cyan-500/80 mt-2">
                <p className="text-cyan-300 font-bold mb-2">TRACING ROUTE TO {target}...</p>
                <p>1  192.168.1.1  (192.168.1.1)  0.42 ms  0.38 ms  0.35 ms</p>
                <p>2  10.0.0.1  (10.0.0.1)  1.24 ms  1.15 ms  1.10 ms</p>
                <p>3  172.16.0.4  (172.16.0.4)  8.45 ms  8.32 ms  8.20 ms [SECURE_GATEWAY]</p>
                <p>4  * * * Request timed out.</p>
                <p>5  209.85.241.25  (209.85.241.25)  12.4 ms  12.1 ms  11.9 ms</p>
                <p>6  {target}  ({target})  15.2 ms  14.8 ms  14.5 ms</p>
                <div className="mt-2 p-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    PACKET_INTEGRITY: 100% // TTL: 54 // PROTOCOL: ICMP/v6
                </div>
            </div>
        );
    },

    "show-report": (args) => {
        const report = args[0];
        if (!report) return <ErrorOutput message="Usage: show-report [id]" />;
        return (
            <div className="p-4 bg-cyan-900/10 border border-cyan-500/20 mt-2 space-y-4">
                <div className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
                    <span className="text-cyan-300 font-bold">REPORT_{report.toUpperCase()}</span>
                    <span className="text-[10px] text-purple-400">CLASSIFIED: LEVEL_3</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-[11px]">
                    <div className="space-y-1">
                        <p className="text-cyan-500/50 uppercase">Findings:</p>
                        <p className="text-cyan-200">Critical vulnerability in auth middleware. 0-day potential.</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-cyan-500/50 uppercase">Timestamp:</p>
                        <p className="text-cyan-200">{new Date().toISOString()}</p>
                    </div>
                </div>
                <div className="bg-black/40 p-2 font-mono text-[10px] text-red-400/80">
                    REDACTED: [REDACTED] [REDACTED] [REDACTED]
                </div>
            </div>
        );
    },

    start: (args, ctx) => {
        const sequence = [
            "DECRYPTING SYSTEM BLOCKS...",
            "INITIALIZING NEURAL KERNEL...",
            "LOADING USER PRIVILEGES...",
            "SYSTEM GUIDED WALKTHROUGH READY."
        ];
        let i = 0;
        const interval = setInterval(() => {
            ctx.setLogs(prev => [...prev, {
                id: `walkthrough-${i}`,
                type: "output",
                content: <span className="text-cyan-600/50">[{new Date().toLocaleTimeString()}] {sequence[i]}</span>
            }]);
            i++;
            if (i >= sequence.length) {
                clearInterval(interval);
                ctx.setLogs(prev => [...prev, {
                    id: "walkthrough-complete",
                    type: "output",
                    content: (
                        <div className="bg-purple-500/10 p-4 border border-purple-500/20 mt-2">
                            <p className="text-purple-400 font-bold uppercase mb-2">Tutorial Protocol Active:</p>
                            <ol className="list-decimal list-inside space-y-1 text-cyan-300">
                                <li>Run <span className="text-white font-bold">ls</span> to see current nodes</li>
                                <li>Run <span className="text-white font-bold">cd projects</span> to enter research directory</li>
                                <li>Run <span className="text-white font-bold">cat README.md</span> inside a project</li>
                                <li>Run <span className="text-white font-bold">analyze malware</span> for deep scan demo</li>
                            </ol>
                        </div>
                    )
                }]);
            }
        }, 800);
        return <SuccessOutput message="WALKTHROUGH_SEQUENCE_INITIATED" />;
    },

    certs: (args, ctx) => {
        ctx.setOverlay("Validated Credentials", "file", <CertificationsSection />);
        return <SuccessOutput message="VERIFYING_SECURE_CERTIFICATES" />;
    },

    experience: (args, ctx) => {
        ctx.setOverlay("Professional History", "file", <ExperienceSection />);
        return <SuccessOutput message="LOADING_EMPLOYMENT_RECORDS" />;
    },

    contact: (args, ctx) => {
        ctx.setOverlay("Secure Communication Handshake", "system", <ContactSection />);
        return <SuccessOutput message="ESTABLISHING_TLS_LINK" />;
    },

    "system": (args) => {
        if (args[0] === "status") {
            return (
                <div className="grid grid-cols-2 gap-8 py-4 border-y border-cyan-500/20 mt-2">
                    <div className="space-y-2">
                        <h3 className="text-cyan-300 font-bold uppercase text-xs">Kernel Integrity</h3>
                        <div className="h-2 bg-cyan-900/30 overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "98%" }} className="h-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                        </div>
                        <p className="text-[10px] text-cyan-500/60 font-mono">HASH: 0xFD42...3A // VERIFIED</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-cyan-300 font-bold uppercase text-xs">Network Latency</h3>
                        <div className="h-2 bg-cyan-900/30 overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "15%" }} className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                        </div>
                        <p className="text-[10px] text-cyan-500/60 font-mono">AVG: 14ms // PKT_LOSS: 0%</p>
                    </div>
                </div>
            );
        }
        return <ErrorOutput message="Usage: system status" />;
    },

    clear: (args, ctx) => {
        ctx.setLogs([]);
    },
};
