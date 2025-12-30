"use client";

import { Search, Moon, Sun } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { formatCNPJ } from "@/app/libs/utils";
import { useTheme } from "@/app/hooks/use-theme";

interface HeaderProps {
  onCNPJSearch?: (cnpj: string) => void;
}

export function Header({ onCNPJSearch }: HeaderProps) {
  const [cnpj, setCnpj] = useState("");
  const { isDark, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedCNPJ = cnpj.replace(/\D/g, "");
    if (cleanedCNPJ.length === 14) {
      onCNPJSearch?.(cleanedCNPJ);
    }
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 14) {
      setCnpj(value);
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-950">
      <form onSubmit={handleSearch} className="flex flex-1 items-center gap-4 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Buscar CNPJ (Health Check)"
            value={formatCNPJ(cnpj)}
            onChange={handleCNPJChange}
            className="pl-10"
            maxLength={18}
          />
        </div>
        <Button type="submit" size="sm">
          Buscar
        </Button>
      </form>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="h-9 w-9 p-0"
        >
          {isDark ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </header>
  );
}

