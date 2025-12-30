"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  onCNPJSearch?: (cnpj: string) => void;
}

export function MainLayout({ children, onCNPJSearch }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onCNPJSearch={onCNPJSearch} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

