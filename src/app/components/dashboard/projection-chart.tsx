"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { formatCurrency } from "@/app/libs/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export interface MonthlyData {
  month: string;
  creditRecovered: number;
  creditLost: number;
}

interface ProjectionChartProps {
  data: MonthlyData[];
}

export function ProjectionChart({ data }: ProjectionChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    creditRecovered: item.creditRecovered,
    creditLost: item.creditLost,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projeção de Crédito Tributário</CardTitle>
        <CardDescription>
          Comparativo entre crédito recuperado vs. crédito perdido
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
            <XAxis
              dataKey="month"
              className="text-xs"
              tick={{ fill: "currentColor" }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: "currentColor" }}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
              formatter={(value: number | undefined) => 
                value !== undefined ? formatCurrency(value) : ""
              }
            />
            <Legend />
            <Bar
              dataKey="creditRecovered"
              name="Crédito Recuperado"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="creditLost"
              name="Crédito Perdido"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

