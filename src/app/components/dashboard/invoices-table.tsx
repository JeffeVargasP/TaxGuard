"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { formatCurrency, formatCNPJ } from "@/app/libs/utils";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export type InvoiceStatus = "paid" | "pending" | "lost";

export interface Invoice {
  id: string;
  accessKey: string;
  supplier: string;
  supplierCNPJ: string;
  creditValue: number;
  status: InvoiceStatus;
  date: string;
}

interface InvoicesTableProps {
  invoices: Invoice[];
}

const statusConfig: Record<InvoiceStatus, { label: string; icon: React.ReactNode; color: string }> = {
  paid: {
    label: "Pago",
    icon: <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />,
    color: "text-green-600 dark:text-green-400",
  },
  pending: {
    label: "Em Auditoria",
    icon: <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />,
    color: "text-yellow-600 dark:text-yellow-400",
  },
  lost: {
    label: "Inadimplente",
    icon: <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />,
    color: "text-red-600 dark:text-red-400",
  },
};

export function InvoicesTable({ invoices }: InvoicesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notas Fiscais</CardTitle>
        <CardDescription>Listagem de notas fiscais e status de crédito tributário</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-400">
                  Chave de Acesso
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-400">
                  Fornecedor
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-400">
                  Valor do Crédito
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => {
                const status = statusConfig[invoice.status];
                return (
                  <tr
                    key={invoice.id}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm">{invoice.accessKey}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium">{invoice.supplier}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          {formatCNPJ(invoice.supplierCNPJ)}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold">{formatCurrency(invoice.creditValue)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {status.icon}
                        <span className={`text-sm font-medium ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {invoices.length === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              Nenhuma nota fiscal encontrada
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

