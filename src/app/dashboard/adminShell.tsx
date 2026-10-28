"use client";
import Dashbord_header from "@/src/dashboard_component/header";
import Dashboard_sidebar from "@/src/dashboard_component/sidebar";
import FilingAssistant from "@/src/dashboard_component/filing-assistant";
import {
  SidebarInset,
  SidebarProvider,
} from "@/src/micro-components/sidebar";
import { TaxProvider } from "@/src/lib/tax-context";

// @ admin-shell-interface : define props interface for admin shell component
interface AdmiShell {
  children: React.ReactNode;
}

// @ admin-shell-component : main admin dashboard shell with sidebar and header
export const AdminShell = ({ children }: AdmiShell) => {
  // @ render : VS Code workbench layout with activity bar, sidebar, editor area, and status bar
  return (
    <TaxProvider>
      {/* 1. Wrapping the entire shell in the sidebar provider */}
      <SidebarProvider>
        {/* placing the sidebar first */}
        <Dashboard_sidebar />

        {/* using sidebarInset to wrap the main content area */}
        <SidebarInset>
          {/* Adding header with hamburger */}
          <Dashbord_header />

          {/* Main page content - VS Code editor area: compact spacing */}
          <div className="flex flex-1 flex-col gap-2 p-2 pt-2 overflow-auto">{children}</div>

          {/* Status bar - VS Code bottom bar */}
          <div className="flex items-center h-[22px] px-2 border-t border-border bg-primary text-primary-foreground text-[11px] shrink-0 select-none">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-primary-foreground/80" />
              Taxora v1.0
            </span>
            <div className="flex-1" />
            <span className="text-primary-foreground/70">2026 Tax Year</span>
          </div>

          {/* Smart Filing Assistant - floating panel */}
          <FilingAssistant />
        </SidebarInset>
      </SidebarProvider>
    </TaxProvider>
  );
};
