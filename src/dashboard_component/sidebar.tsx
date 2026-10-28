"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../micro-components/sidebar";
import {
  LayoutDashboard,
  Receipt,
  FileText,
  Settings,
  LogOut,
  User,
  Wallet,
  Calculator,
  FileCheck,
  PiggyBank
} from "lucide-react";
import { useTax } from "@/src/lib/tax-context";
import { usePathname } from "next/navigation";

// 1. DATA: Define your navigation items here.
const items = [
  {
    title: "Tax Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Income Sources",
    url: "/dashboard/transactions",
    icon: Wallet,
  },
  {
    title: "Deductions",
    url: "/dashboard/deductions",
    icon: PiggyBank,
  },
  {
    title: "Tax Calculator",
    url: "/dashboard/taxestimation",
    icon: Calculator,
  },
  {
    title: "Filing & Reports",
    url: "/dashboard/reports",
    icon: FileCheck,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Dashboard_sidebar() {
  const { state } = useTax();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      {/* HEADER: Logo - shows "T" when collapsed, "Taxora" when expanded */}
      <SidebarHeader className="flex items-center justify-center py-1.5 h-[35px] border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-[2px] flex items-center justify-center text-[11px] font-bold text-primary-foreground shrink-0">
            T
          </div>
          <span className="text-[12px] font-semibold text-foreground tracking-tight group-data-[collapsible=icon]:hidden">
            Taxora
          </span>
        </div>
      </SidebarHeader>

      {/* CONTENT: The main navigation links */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase font-semibold tracking-wider text-muted-foreground px-3 h-[22px]">
            Explorer
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className={`
                        h-[34px] px-3 gap-[6px] rounded-[2px] text-[13px]
                        [&_svg]:size-[18px]
                        ${isActive ? "border-l-2 border-l-primary bg-accent" : "border-l-2 border-l-transparent"}
                      `}
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER: User profile, logout */}
      <SidebarFooter className="border-t border-border py-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-[34px] px-3 gap-[6px] text-[13px] [&_svg]:size-[18px]">
              <User />
              <span className="truncate">{state.profile.fullName}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-[34px] px-3 gap-[6px] text-[13px] text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 [&_svg]:size-[18px]">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* RAIL: Allows dragging to resize sidebar */}
      <SidebarRail />
    </Sidebar>
  );
}
