import React from "react";
import StatsChartClientNfl from "@/app/components/StatsChartClientNfl";
import { ChartConfig } from "@/app/components/ui/chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";

// Refined type for data, where `week` is used
interface Stat {
  week: number;
  opponent: string;
  venue: string;
  [key: string]: any;
}

interface StatsChartServerNflProps {
  title: string;
  data: Stat[]; // Using refined Stat type
  dataKey: string;
  config: ChartConfig;
}

const StatsChartServerNfl: React.FC<StatsChartServerNflProps> = ({
  title,
  data,
  dataKey,
  config,
}) => {
  const chartSettings = config[dataKey];
  if (!chartSettings) {
    console.error(`config does not contain settings for dataKey: ${dataKey}`);
    return null;
  }

  return (
    <div className="pl-10 pr-10 pt-10 pb-10">
      <Card className="bg-black border-none">
        <CardHeader>
          <CardTitle className="text-pink-600">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <StatsChartClientNfl
            data={data.map((stat) => ({
              ...stat,
              time: Number(stat.week), // Use 'week' for NFL
              opponent: stat.opponent,
              venue: stat.venue,
              week: Number(stat.week),
            }))}
            dataKey={dataKey}
            color={chartSettings.color || ""}
            league="nfl"
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default StatsChartServerNfl;
