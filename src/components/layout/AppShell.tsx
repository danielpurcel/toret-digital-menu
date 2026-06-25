import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

export const AppShell = ({ children, noTopPadding }: { children: ReactNode; noTopPadding?: boolean }) => {
  return (
    <div className="app-shell flex flex-col">
      <Header />
      <main className={cn("flex-1 pb-32", !noTopPadding && "pt-20")}>{children}</main>
      <BottomNav />
    </div>
  );
};
