import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

export const AppShell = ({
  children,
  noTopPadding,
  transparentHeader,
}: {
  children: ReactNode;
  noTopPadding?: boolean;
  transparentHeader?: boolean;
}) => {
  return (
    <div className="app-shell flex flex-col">
      <Header transparent={transparentHeader} />
      <main className={cn("flex-1 pb-32", !noTopPadding && "pt-[96px]")}>{children}</main>
      <BottomNav />
    </div>
  );
};
