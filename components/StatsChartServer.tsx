import React from "react";
import StatsChartClient from "./StatsChartClient";
import { ChartConfig } from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StatsChartServerProps {
  title: string;
  data: { week: string | number; [key: string]: any }[];
  dataKey: string;
  config: ChartConfig;
}

const StatsChartServer: React.FC<StatsChartServerProps> = ({
  title,
  data,
  dataKey,
  config,
}) => {
  const chartSettings = config[dataKey];
  if (!chartSettings) {
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
          <StatsChartClient
            data={data}
            dataKey={dataKey}
            color={chartSettings.color || ""}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default StatsChartServer;
