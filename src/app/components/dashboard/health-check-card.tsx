"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { formatCNPJ } from "@/app/libs/utils";
import { Shield, AlertCircle, CheckCircle2, XCircle } from "lucide-react";

type Rating = "A" | "B" | "C" | "D";

interface HealthCheckCardProps {
  cnpj: string;
  rating: Rating;
  supplierName?: string;
}

const ratingConfig: Record<Rating, { color: string; bgColor: string; label: string; icon: React.ReactNode }> = {
  A: {
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    label: "Compra Segura",
    icon: <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />,
  },
  B: {
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    label: "Risco Baixo",
    icon: <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  },
  C: {
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    label: "Risco Moderado",
    icon: <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
  },
  D: {
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    label: "Risco Financeiro Elevado",
    icon: <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
  },
};

const getRiskPercentage = (rating: Rating): number => {
  switch (rating) {
    case "A": return 10;
    case "B": return 30;
    case "C": return 60;
    case "D": return 90;
  }
};

export function HealthCheckCard({ cnpj, rating, supplierName }: HealthCheckCardProps) {
  const config = ratingConfig[rating];
  const riskPercentage = getRiskPercentage(rating);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Health Check - Serasa PJ
        </CardTitle>
        <CardDescription>Rating de crédito tributário do fornecedor</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">CNPJ</p>
          <p className="font-mono text-lg font-semibold">{formatCNPJ(cnpj)}</p>
          {supplierName && (
            <>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 mb-1">Razão Social</p>
              <p className="text-base font-medium">{supplierName}</p>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className={`flex h-20 w-20 items-center justify-center rounded-full ${config.bgColor}`}>
            <span className={`text-3xl font-bold ${config.color}`}>{rating}</span>
          </div>
          <div className="flex-1">
            <p className={`text-sm font-medium ${config.color} mb-1`}>{config.label}</p>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className={`h-full transition-all ${
                  rating === "A" || rating === "B"
                    ? "bg-green-500 dark:bg-green-400"
                    : rating === "C"
                    ? "bg-yellow-500 dark:bg-yellow-400"
                    : "bg-red-500 dark:bg-red-400"
                }`}
                style={{ width: `${riskPercentage}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Risco: {riskPercentage}%
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-2 rounded-lg p-3 ${config.bgColor}`}>
          {config.icon}
          <p className={`text-sm font-medium ${config.color}`}>
            {rating === "A" || rating === "B"
              ? "✓ Compra Segura - Crédito tributário garantido"
              : "⚠ Atenção - Verifique o pagamento de impostos antes de comprar"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

