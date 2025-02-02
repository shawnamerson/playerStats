import React from "react";
import StatsChartClientNba from "@/app/components/StatsChartClientNba";
import { ChartConfig } from "@/app/components/ui/chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";

// Refined type for data, where `game` is dynamically used
interface Stat {
  game: number;
  opponent: string;
  venue: string;
  [key: string]: any;
}

interface StatsChartServerNbaProps {
  title: string;
  data: Stat[]; // Using refined Stat type
  dataKey: string;
  config: ChartConfig;
}

const StatsChartServerNba: React.FC<StatsChartServerNbaProps> = ({
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
          <StatsChartClientNba
            data={data.map((stat) => ({
              ...stat,
              time: Number(stat.game), // Use 'game' for NBA as time
              opponent: stat.opponent,
              venue: stat.venue,
              game: Number(stat.game),
            }))}
            dataKey={dataKey}
            color={chartSettings.color || "hotpink"} // Default color if not provided
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsChartServerNba;
