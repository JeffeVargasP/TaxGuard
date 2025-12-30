"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { formatCurrency } from "@/app/libs/utils";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

interface StatsCardsProps {
  creditGuaranteed: number;
  creditInAudit: number;
  creditLost: number;
}

export function StatsCards({
  creditGuaranteed,
  creditInAudit,
  creditLost,
}: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Crédito Garantido */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">
            Crédito Garantido
          </CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700 dark:text-green-400">
            {formatCurrency(creditGuaranteed)}
          </div>
          <p className="text-xs text-green-600 dark:text-green-500 mt-1">
            Valor total recuperado
          </p>
        </CardContent>
      </Card>

      {/* Crédito em Auditoria */}
      <Card className="border-yellow-200 bg-yellow-50/50 dark:border-yellow-900 dark:bg-yellow-950/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
            Crédito em Auditoria
          </CardTitle>
          <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
            {formatCurrency(creditInAudit)}
          </div>
          <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-1">
            Aguardando pagamento do fornecedor
          </p>
        </CardContent>
      </Card>

      {/* Crédito Perdido/Risco */}
      <Card className="border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-700 dark:text-red-400">
            Crédito Perdido/Risco
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-700 dark:text-red-400">
            {formatCurrency(creditLost)}
          </div>
          <p className="text-xs text-red-600 dark:text-red-500 mt-1">
            Imposto não pago pelo fornecedor
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

