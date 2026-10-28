"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTax } from "@/src/lib/tax-context";
import { Terminal, X, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getComplianceColor } from "@/src/lib/compliance-service";

export default function FilingAssistant() {
  const { state, computed } = useTax();
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  const color = getComplianceColor(computed.compliance.score);

  return (
    <div className="fixed bottom-8 right-3 z-50">
      <AnimatePresence>
        <motion.div
           initial={{ opacity: 0, y: 20, scale: 0.95 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           exit={{ opacity: 0, y: 20, scale: 0.95 }}
           transition={{ duration: 0.2 }}
           className="w-72 overflow-hidden rounded-[2px] border border-border bg-card shadow-lg font-mono text-[12px]"
        >
          {/* Header */}
          <div className="bg-muted px-3 py-1 flex justify-between items-center border-b border-border h-[28px]">
            <div className="flex items-center gap-1.5">
               <Terminal className="w-3 h-3 text-primary" />
               <span className="font-semibold text-foreground text-[11px] tracking-tight uppercase">Terminal</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground p-0.5">
               <X className="w-3 h-3" />
            </button>
          </div>

          {/* Content */}
          <div className="p-2 space-y-2">
             
             {/* Status line */}
             <div>
               <div className="flex justify-between items-center mb-0.5">
                 <span className="text-muted-foreground text-[10px] uppercase tracking-wider font-semibold">Status</span>
                 <span style={{ color }} className="font-bold text-[11px]">
                   [{computed.compliance.score}%]
                 </span>
               </div>
               
               {/* Terminal style output */}
               <div className="mt-1 border-l-2 border-primary/50 pl-2 py-0.5">
                  {computed.compliance.warnings.length === 0 ? (
                     <div className="flex items-start gap-1.5 text-primary text-[11px]">
                        <CheckCircle2 className="w-3 h-3 shrink-0 mt-0.5" />
                        <span className="leading-tight">All systems nominal. Ready to file.</span>
                     </div>
                  ) : (
                     <div className="text-yellow-500 dark:text-yellow-400">
                        {computed.compliance.warnings.slice(0, 2).map((w, i) => (
                           <div key={i} className="flex items-start gap-1.5 mb-0.5 last:mb-0 text-[10px]">
                              <span className="shrink-0 text-yellow-500/50">{">"}</span>
                              <span className="leading-tight">{w}</span>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
             </div>

             {/* Action block */}
             {computed.nextAction && (
               <div className="pt-1.5 border-t border-border">
                  <Link 
                     href={computed.nextAction.route}
                     className="group block"
                  >
                     <div className="flex items-center justify-between text-muted-foreground hover:text-primary transition-colors text-[11px]">
                        <span className="truncate">{computed.nextAction.action}</span>
                        <ArrowRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                     </div>
                  </Link>
               </div>
             )}

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
