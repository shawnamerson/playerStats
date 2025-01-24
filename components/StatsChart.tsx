"use client";
import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StatsChartProps {
  title: string;
  data: { week: string | number; [key: string]: any }[];
  dataKey: string;
  config: ChartConfig;
}

const StatsChart: React.FC<StatsChartProps> = ({
  title,
  data,
  dataKey,
  config,
}) => {
  // Ensure the config contains the dataKey
  if (!config[dataKey]) {
    console.error(`Config does not contain settings for dataKey: ${dataKey}`);
    return null;
  }

  return (
    <div className="pl-10 pr-10 pt-10 pb-10">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={config} className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `Week ${value}`}
                />

                <Tooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey={dataKey}
                  fill={config[dataKey].color}
                  radius={[4, 4, 0, 0]} // Top rounded corners
                >
                  <LabelList
                    dataKey={dataKey}
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsChart;
