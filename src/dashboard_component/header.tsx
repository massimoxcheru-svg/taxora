"use client";
import { ModeToggle } from "../micro-components/mode-toggle";
import { SidebarTrigger } from "../micro-components/sidebar";
import { Badge } from "../micro-components/badge";
import { Bell, CalendarIcon } from "lucide-react";
import { useTax } from "@/src/lib/tax-context";

export default function Dashboard_header() {
  const { computed } = useTax();

  return (
    <header className="flex h-[35px] shrink-0 items-center gap-2 border-b border-border px-2 text-[12px] select-none">
      <SidebarTrigger className="-ml-0.5 h-6 w-6 [&_svg]:size-3.5" />
      <div className="h-3.5 w-px bg-border" />

      {/* Breadcrumb-style page context */}
      <span className="text-muted-foreground text-[12px] hidden md:inline">Taxora</span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Deadline Indicator - compact tab badge */}
      <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-[11px] text-blue-700 dark:text-blue-400">
        <CalendarIcon className="w-3 h-3" />
        <span>Due in {computed.daysUntilDeadline}d</span>
      </div>

      {/* Notifications - compact */}
      <button className="relative p-1 rounded-[2px] hover:bg-accent hidden md:flex items-center justify-center">
        <Bell className="w-3.5 h-3.5 text-muted-foreground" />
        {computed.compliance.warnings.length > 0 && (
          <Badge className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 p-0 flex items-center justify-center bg-red-500 text-[9px] rounded-full">
             {computed.compliance.warnings.length}
          </Badge>
        )}
      </button>

      {/* Dark mode toggle */}
      <ModeToggle />
    </header>
  );
}
