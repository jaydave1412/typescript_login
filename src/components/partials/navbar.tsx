import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ModeToggle } from "../mode-dropdown";

export function Navbar() {
  return (
    <div className="flex md:grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="w-1/2  md:w-full bg-muted/40">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src={"/logo_normal.svg"}
              alt="logo"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span className="">Softwave</span>
          </Link>
        </div>
      </div>
      <div className="w-1/2 md:w-full flex flex-col">
        <header className="flex h-14 justify-end items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <ModeToggle />
        </header>
      </div>
    </div>
  );
}
