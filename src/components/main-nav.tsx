"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  MessageSquare,
  CalendarDays,
  Library,
  BookOpenCheck,
} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const links = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/chat", label: "Community Chat", icon: MessageSquare },
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/resources", label: "Resources", icon: BookOpenCheck },
  { href: "/library", label: "Library", icon: Library },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === link.href}
            tooltip={link.label}
          >
            <Link href={link.href}>
              <link.icon />
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
