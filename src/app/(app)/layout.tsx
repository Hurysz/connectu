import Link from 'next/link';
import { LogOut } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MainNav } from '@/components/main-nav';
import { Logo } from '@/components/logo';
import AIChat from '@/components/ai-chat';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <Logo className="text-sidebar-foreground" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter>
          <div className="flex flex-col gap-2">
             <Link href="/profile" passHref>
                <SidebarMenuButton asChild tooltip="Profile">
                  <div>
                    <Avatar className="h-7 w-7">
                        <AvatarImage src="https://picsum.photos/seed/101/200/200" alt="Alex Doe" data-ai-hint="portrait" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span className="truncate">Alex Doe</span>
                  </div>
                </SidebarMenuButton>
             </Link>
             <Link href="/login" passHref>
                <SidebarMenuButton asChild tooltip="Log Out">
                    <div>
                      <LogOut />
                      <span>Log Out</span>
                    </div>
                </SidebarMenuButton>
             </Link>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full">
            <main className="flex-1 flex flex-col">
                 <header className="flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6 sticky top-0 z-10">
                    <SidebarTrigger className="md:hidden" />
                    <div className="flex-1">
                       <h1 className="text-lg font-headline font-semibold">ConnectU</h1>
                    </div>
                </header>
                <div className="flex-1 p-4 md:p-6 overflow-y-auto">
                    {children}
                </div>
            </main>
            <aside className="w-[350px] border-l bg-background/50 p-4 hidden lg:flex flex-col">
                <AIChat />
            </aside>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
