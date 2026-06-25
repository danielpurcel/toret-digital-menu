import type { ReactNode } from "react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

export const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="app-shell flex flex-col">
      <Header />
      <main className="flex-1 pb-32">{children}</main>
      <BottomNav />
    </div>
  );
};