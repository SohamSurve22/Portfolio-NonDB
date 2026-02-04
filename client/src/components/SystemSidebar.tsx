import { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Shield, Cpu, Network, Clock, Terminal } from "lucide-react";

interface StatusItemProps {
    label: string;
    value: string | number;
    color?: string;
    icon?: any;
}

const StatusItem = ({ label, value, color = "text-cyan-400", icon: Icon }: StatusItemProps) => (
    <div className="flex items-center justify-between py-1 border-b border-cyan-900/20 text-xs">
        <div className="flex items-center gap-2 text-cyan-500/60">
            {Icon && <Icon size={12} />}
            <span className="uppercase tracking-tighter">{label}</span>
        </div>
        <span className={`font-mono font-bold ${color}`}>{value}</span>
    </div>
);

export const SystemSidebar = memo(({ lastCommand, currentDir }: { lastCommand?: string, currentDir: string }) => {
    const [stats, setStats] = useState({
        cpu: 12,
        mem: 45,
        net: 0,
        uptime: "00:00:00"
    });

    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                cpu: Math.floor(Math.random() * 15) + 5,
                mem: 42 + (Math.random() > 0.5 ? 1 : -1) * Math.random(),
                net: Math.floor(Math.random() * 500),
                uptime: new Date().toLocaleTimeString()
            }));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (lastCommand) {
            setLogs(prev => [
                `[${new Date().toLocaleTimeString()}] CMD_EXEC: ${lastCommand}`,
                ...prev.slice(0, 9)
            ]);
        }
    }, [lastCommand]);

    return (
        <div className="w-80 border-l border-cyan-500/20 bg-black/40 backdrop-blur-md flex flex-col h-full overflow-hidden select-none">
            {/* Header */}
            <div className="p-4 border-b border-cyan-500/20 bg-cyan-500/5">
                <h2 className="font-techno text-sm font-bold text-cyan-400 flex items-center gap-2">
                    <Shield size={16} /> SYSTEM STATUS
                </h2>
                <div className="text-[10px] text-cyan-500/40 font-mono mt-1">
                    NODE_ID: SURVE-XPRT-01 // KERNEL: 5.15.0-SECURE
                </div>
            </div>

            {/* Real-time Stats */}
            <div className="p-4 space-y-3">
                <div className="space-y-1">
                    <StatusItem label="CPU Load" value={`${stats.cpu}%`} icon={Cpu} color={stats.cpu > 80 ? "text-red-400" : "text-cyan-400"} />
                    <div className="h-1 bg-cyan-900/30 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-cyan-500"
                            animate={{ width: `${stats.cpu}%` }}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <StatusItem label="Memory Usage" value={`${stats.mem.toFixed(1)}%`} icon={Activity} />
                    <div className="h-1 bg-cyan-900/30 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-purple-500"
                            animate={{ width: `${stats.mem}%` }}
                        />
                    </div>
                </div>

                <StatusItem label="Net Traffic" value={`${stats.net} KB/s`} icon={Network} />
                <StatusItem label="System Time" value={stats.uptime} icon={Clock} />
            </div>

            {/* Directory Context */}
            <div className="mt-4 p-4 border-y border-cyan-500/20 bg-cyan-950/20">
                <div className="text-[10px] text-purple-400 font-bold uppercase mb-2 flex items-center gap-2">
                    <Terminal size={12} /> Working Directory
                </div>
                <div className="font-mono text-xs text-cyan-300 truncate">
                    {currentDir}
                </div>
            </div>

            {/* Activity Feed */}
            <div className="flex-1 flex flex-col min-h-0">
                <div className="p-4 border-b border-cyan-500/10">
                    <h3 className="text-[10px] text-cyan-500/60 font-bold uppercase tracking-widest">Live Activity Log</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 font-mono text-[10px] space-y-2">
                    <AnimatePresence>
                        {logs.map((log, i) => (
                            <motion.div
                                key={`${i}-${log}`}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-cyan-400/70 border-l border-cyan-500/20 pl-2"
                            >
                                {log}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {logs.length === 0 && (
                        <div className="text-cyan-900 italic">No activity detected...</div>
                    )}
                </div>
            </div>

            {/* Footer Branding */}
            <div className="p-4 border-t border-cyan-500/20">
                <div className="flex justify-between items-center text-[8px] text-cyan-500/30 font-mono">
                    <span>SECURE_SHELL_v2.0</span>
                    <span className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" /> ENCRYPTED
                    </span>
                </div>
            </div>
        </div>
    );
});
