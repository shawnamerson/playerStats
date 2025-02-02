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
  [key: string]: string | number; // Allowing only string or number for dynamic properties
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
    console.error(`Config does not contain settings for dataKey: ${dataKey}`);
    return (
      <div className="text-center text-red-500 mt-6">
        <p>Sorry, we couldn't load the chart data for {title}.</p>
      </div>
    );
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
              time: stat.week, // Use 'week' for NFL as time
              opponent: stat.opponent,
              venue: stat.venue,
              week: stat.week, // Ensure `week` is a number
            }))}
            dataKey={dataKey}
            color={chartSettings.color || "hotpink"} // Default color if not provided
            league="nfl"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsChartServerNfl;
