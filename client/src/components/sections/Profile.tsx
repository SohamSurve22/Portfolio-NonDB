import React from "react";
import { User } from "lucide-react";

export const ProfileSection = () => {
    return (
        <div className="space-y-6 pt-4">
            {/* Header with Image */}
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                <div className="relative group">
                    <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-cyan-500/50 rounded-full overflow-hidden bg-cyan-900/10 flex items-center justify-center relative z-10">
                        {/* 
                            TODO: To add your image, uncomment the img tag below and provide the path.
                            Ensure the image is in the public folder or imported.
                        */}
                        {<img src="/images/Profile.png" alt="Soham Surve" className="w-full h-full rounded-full object-cover" />}


                    </div>
                    {/* Decorative rings */}
                    <div className="absolute inset-0 border border-cyan-500/30 rounded-full scale-110 animate-pulse" />
                    <div className="absolute inset-0 border border-purple-500/20 rounded-full scale-125 animate-spin-slow" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">
                        Soham Surve
                    </h2>
                    <p className="text-purple-400 font-mono text-sm uppercase tracking-widest font-bold">
                        Cybersecurity Research Engineer // Systems Architect
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                        <span className="px-2 py-1 bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono rounded">
                            STATUS: ONLINE
                        </span>
                        <span className="px-2 py-1 bg-purple-950/50 border border-purple-500/30 text-purple-300 text-[10px] font-mono rounded">
                            CLEARANCE: LEVEL_5
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono">
                {/* Security & Research */}
                <div className="space-y-3">
                    <h3 className="text-cyan-300 font-bold border-b border-cyan-500/30 pb-1 mb-2 inline-block">
                        SECURITY_DOMAIN
                    </h3>
                    <ul className="space-y-2 text-cyan-400/80">
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                            Malware Analysis (Static & Dynamic)
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                            Sandbox Automation & Triage
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                            Threat Intelligence & IOC Analysis
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                            Network Forensics (PCAP, DNS)
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                            Secure Systems Engineering
                        </li>
                    </ul>
                </div>

                {/* AI & Automation */}
                <div className="space-y-3">
                    <h3 className="text-purple-300 font-bold border-b border-purple-500/30 pb-1 mb-2 inline-block">
                        AI_&_AUTOMATION
                    </h3>
                    <ul className="space-y-2 text-purple-400/80">
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-purple-500 rounded-full" />
                            AI-Assisted Malware Workflows
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-purple-500 rounded-full" />
                            Security Process Automation
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-purple-500 rounded-full" />
                            Data-Driven Threat Analysis
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-purple-500 rounded-full" />
                            Low-Latency Python Pipelines
                        </li>
                    </ul>
                </div>

                {/* Engineering Stack */}
                <div className="space-y-3">
                    <h3 className="text-green-300 font-bold border-b border-green-500/30 pb-1 mb-2 inline-block">
                        PROGRAMMING
                    </h3>
                    <ul className="space-y-2 text-green-400/80">
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-green-500 rounded-full" />
                            Python (Automation, Malware Analysis, Django)
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-green-500 rounded-full" />
                            C++ (OOP, Engines, Low-Level Design)
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-green-500 rounded-full" />
                            Java (Backend Fundamentals)
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-green-500 rounded-full" />
                            TypeScript / JavaScript (Async Systems)
                        </li>
                    </ul>
                </div>

                {/* Systems & Cloud */}
                <div className="space-y-3">
                    <h3 className="text-orange-300 font-bold border-b border-orange-500/30 pb-1 mb-2 inline-block">
                        SYSTEMS_&_CLOUD
                    </h3>
                    <ul className="space-y-2 text-orange-400/80">
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-orange-500 rounded-full" />
                            Docker & Kubernetes
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-orange-500 rounded-full" />
                            AWS Cloud Fundamentals
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-orange-500 rounded-full" />
                            DevSecOps Pipelines
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-orange-500 rounded-full" />
                            Operating Systems & Networking
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Toolchain */}
            <div className="pt-4 border-t border-cyan-500/20">
                <p className="text-[10px] font-mono text-cyan-500/60 uppercase mb-2">Primary_Toolchain:</p>
                <div className="flex flex-wrap gap-2">
                    {[
                        "Cuckoo Sandbox", "REMnux", "FLARE-VM", "ProcMon", "Process Hacker",
                        "INetSim", "Wireshark", "Regshot", "VMware", "Django", "React", "Supabase"
                    ].map(tool => (
                        <span key={tool} className="px-2 py-1 bg-cyan-900/30 text-cyan-300 text-[10px] rounded border border-cyan-500/10">
                            {tool}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
