import { LoginForm } from "@/components/login";
import { ModeToggle } from "@/components/mode-dropdown";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen overflow-hidden w-full">
      <LoginForm />
    </main>
  );
}
