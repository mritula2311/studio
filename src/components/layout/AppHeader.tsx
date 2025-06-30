"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Shield, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export function AppHeader({ serviceType }: { serviceType: "Police" | "Medical" }) {
  const pathname = usePathname();
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }
  
  const userName = serviceType === "Police" ? "Officer Smith" : "Medic Johnson";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
        <Shield className="h-6 w-6 text-primary" />
        <span className="sr-only">Crash Guard</span>
      </Link>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/police-dashboard" className={`transition-colors hover:text-foreground ${pathname === '/police-dashboard' ? 'text-foreground' : 'text-muted-foreground'}`}>
            Police Dashboard
        </Link>
        <Link href="/medical-dashboard" className={`transition-colors hover:text-foreground ${pathname === '/medical-dashboard' ? 'text-foreground' : 'text-muted-foreground'}`}>
            Medical Dashboard
        </Link>
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
              <h1 className="text-lg font-semibold">{serviceType} Dashboard</h1>
          </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt={userName} data-ai-hint="person" />
                <AvatarFallback>{getInitials(userName)}</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
