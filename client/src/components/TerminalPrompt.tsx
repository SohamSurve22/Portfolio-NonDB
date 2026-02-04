import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface TerminalPromptProps {
  onCommand: (command: string) => void;
  history: string[];
  path?: string;
}

export function TerminalPrompt({ onCommand, history, path = "/" }: TerminalPromptProps) {
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    focusInput();
    window.addEventListener("click", focusInput);
    return () => window.removeEventListener("click", focusInput);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        onCommand(input);
        setInput("");
        setHistoryIndex(-1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "c" && e.ctrlKey) {
      setInput("");
    }
  };

  return (
    <div className="flex items-center w-full mt-2 font-mono text-base md:text-lg">
      <span className="text-purple-400 mr-1 font-bold shrink-0">guest</span>
      <span className="text-cyan-400/60 mr-1">@</span>
      <span className="text-cyan-300 mr-1 font-bold font-techno">portfolio</span>
      <span className="text-cyan-400 mr-2">{path === "/" ? "~" : path}$</span>
      <div className="relative flex-grow">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none outline-none text-cyan-300 caret-transparent font-mono"
          autoComplete="off"
          spellCheck="false"
          data-testid="input-terminal"
        />
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, repeatType: "reverse" }}
          className="absolute top-0 bottom-0 w-[10px] bg-cyan-400 pointer-events-none"
          style={{
            left: `${input.length}ch`,
            transform: `translateY(2px)`,
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)'
          }}
        />
      </div>
    </div>
  );
}
