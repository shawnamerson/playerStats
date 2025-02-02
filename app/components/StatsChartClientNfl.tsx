"use client";

import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

interface StatsChartClientNflProps {
  data: {
    week: number; // NFL
    opponent: string;
    venue: string;
    [key: string]: any;
  }[];
  dataKey: string;
  color: string;
  league: "nfl" | "nba"; // Add league prop to handle conditional logic
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}) => {
  if (active && payload && payload.length) {
    const { opponent, venue } = payload[0].payload;
    return (
      <div className="p-2 bg-black text-pink-600 text-sm rounded shadow">
        <p className="font-semibold">{`Game ${label}`}</p>
        <p>{`Opponent: ${opponent}`}</p>
        <p>{`Venue: ${venue}`}</p>
      </div>
    );
  }

  return null;
};

const StatsChartClientNfl: React.FC<StatsChartClientNflProps> = ({
  data = [],
  dataKey,
  color,
  league, // Access the league prop here
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        <p>No data available to display.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <XAxis
          dataKey={league === "nfl" ? "week" : "game"} // Use week for NFL, game for NBA
          tick={{ fontSize: 18, fill: "hotpink" }} // Change the text color to white
          tickFormatter={(value) =>
            `${league === "nfl" ? "Week" : "Game"} ${value}`
          }
        />

        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey={dataKey}
          fill={color}
          radius={[4, 4, 0, 0]} // Top rounded corners
        >
          <LabelList
            dataKey={dataKey}
            position="top"
            style={{ fontSize: 20, fill: "hotpink" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatsChartClientNfl;
