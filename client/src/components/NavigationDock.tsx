import { motion } from "framer-motion";
import { User, Folder, Wrench, Award, Mail, Info, Briefcase } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavigationDockProps {
    onCommand: (command: string) => void;
}

const navItems = [
    { label: "Profile", command: "whoami", icon: User, description: "View technical identity" },
    { label: "Projects", command: "open projects", icon: Folder, description: "Explore research directories" },
    { label: "Skills", command: "skills --matrix", icon: Wrench, description: "View proficiency matrix" },
    { label: "Experience", command: "experience", icon: Briefcase, description: "View professional history" },
    { label: "Credentials", command: "certs", icon: Award, description: "Verify certifications" },
    { label: "Handshake", command: "open contact", icon: Mail, description: "Establish secure link" },
];

export function NavigationDock({ onCommand }: NavigationDockProps) {
    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 px-4 py-2 bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-full shadow-2xl">
            <div className="flex items-center gap-1 md:gap-4">
                <TooltipProvider>
                    {navItems.map((item) => (
                        <Tooltip key={item.label}>
                            <TooltipTrigger asChild>
                                <motion.button
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onCommand(item.command)}
                                    className="p-2 md:p-3 text-cyan-500/60 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-full transition-all"
                                >
                                    <item.icon size={20} className="md:w-6 md:h-6" />
                                </motion.button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-black/90 border-cyan-500/30 text-cyan-300 font-mono text-xs">
                                <p className="font-bold">{item.label}</p>
                                <p className="text-[10px] text-cyan-500/60">{item.description}</p>
                                <p className="mt-1 border-t border-cyan-500/10 pt-1 text-[9px] italic">CMD: {item.command}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}

                    <div className="w-px h-6 bg-cyan-500/20 mx-1 md:mx-2" />

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="p-2 text-purple-500/40 cursor-help">
                                <Info size={16} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[200px] bg-black/90 border-purple-500/30 text-purple-300 font-mono text-[10px]">
                            <p>HYBRID_INIT: You can use these controls or type commands directly into the terminal.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
}
