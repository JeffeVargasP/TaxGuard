"use client";

import { MainLayout } from "@/app/components/layout/main-layout";
import { StatsCards } from "@/app/components/dashboard/stats-cards";
import { XMLDropzone } from "@/app/components/upload/xml-dropzone";
import { HealthCheckCard } from "@/app/components/dashboard/health-check-card";
import { InvoicesTable, type Invoice } from "@/app/components/dashboard/invoices-table";
import { ProjectionChart, type MonthlyData } from "@/app/components/dashboard/projection-chart";
import { useState } from "react";

// Dados de exemplo
const mockInvoices: Invoice[] = [
  {
    id: "1",
    accessKey: "35201212345678901234567890123456789012345678",
    supplier: "Fornecedor ABC Ltda",
    supplierCNPJ: "12345678000190",
    creditValue: 15000.50,
    status: "paid",
    date: "2024-01-15",
  },
  {
    id: "2",
    accessKey: "35201212345678901234567890123456789012345679",
    supplier: "Fornecedor XYZ S.A.",
    supplierCNPJ: "98765432000110",
    creditValue: 8500.75,
    status: "pending",
    date: "2024-01-20",
  },
  {
    id: "3",
    accessKey: "35201212345678901234567890123456789012345680",
    supplier: "Fornecedor Risco Ltda",
    supplierCNPJ: "11111111000111",
    creditValue: 12000.00,
    status: "lost",
    date: "2024-01-25",
  },
  {
    id: "4",
    accessKey: "35201212345678901234567890123456789012345681",
    supplier: "Fornecedor Seguro EIRELI",
    supplierCNPJ: "22222222000122",
    creditValue: 25000.00,
    status: "paid",
    date: "2024-02-01",
  },
];

const mockMonthlyData: MonthlyData[] = [
  { month: "Out 2024", creditRecovered: 45000, creditLost: 12000 },
  { month: "Nov 2024", creditRecovered: 52000, creditLost: 15000 },
  { month: "Dez 2024", creditRecovered: 48000, creditLost: 18000 },
  { month: "Jan 2025", creditRecovered: 60000, creditLost: 20000 },
  { month: "Fev 2025", creditRecovered: 55000, creditLost: 22000 },
];

export default function Home() {
  const [searchedCNPJ, setSearchedCNPJ] = useState<string | null>(null);
  const [healthCheckRating, setHealthCheckRating] = useState<"A" | "B" | "C" | "D">("A");

  const handleCNPJSearch = (cnpj: string) => {
    setSearchedCNPJ(cnpj);
    // Simular busca e definir rating baseado no CNPJ
    const lastDigit = parseInt(cnpj[cnpj.length - 1]);
    if (lastDigit < 3) setHealthCheckRating("A");
    else if (lastDigit < 6) setHealthCheckRating("B");
    else if (lastDigit < 9) setHealthCheckRating("C");
    else setHealthCheckRating("D");
  };

  const handleUploadComplete = (files: File[]) => {
    console.log("Upload completo:", files);
    // Aqui você pode adicionar lógica para processar os arquivos
  };

  // Calcular totais dos cards
  const creditGuaranteed = mockInvoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.creditValue, 0);

  const creditInAudit = mockInvoices
    .filter((inv) => inv.status === "pending")
    .reduce((sum, inv) => sum + inv.creditValue, 0);

  const creditLost = mockInvoices
    .filter((inv) => inv.status === "lost")
    .reduce((sum, inv) => sum + inv.creditValue, 0);

  return (
    <MainLayout onCNPJSearch={handleCNPJSearch}>
      <div className="space-y-6">
        {/* Cards de Estatísticas */}
        <StatsCards
          creditGuaranteed={creditGuaranteed}
          creditInAudit={creditInAudit}
          creditLost={creditLost}
        />

        {/* Health Check Card (se CNPJ foi buscado) */}
        {searchedCNPJ && (
          <HealthCheckCard
            cnpj={searchedCNPJ}
            rating={healthCheckRating}
            supplierName="Fornecedor Consultado"
          />
        )}

        {/* Upload XML e Gráfico lado a lado */}
        <div className="grid gap-6 md:grid-cols-2">
          <XMLDropzone onUploadComplete={handleUploadComplete} />
          <ProjectionChart data={mockMonthlyData} />
        </div>

        {/* Tabela de Notas Fiscais */}
        <InvoicesTable invoices={mockInvoices} />
      </div>
    </MainLayout>
  );
}
