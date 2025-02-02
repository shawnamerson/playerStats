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

// Define a type for the NBA data structure
interface GameData {
  game: number; // NBA game
  opponent: string;
  venue: string;
  [key: string]: string | number; // Allow other dynamic fields with specific types
}

interface StatsChartClientNbaProps {
  data: GameData[];
  dataKey: string;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: GameData }[];
  label?: string | number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
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

const StatsChartClientNba: React.FC<StatsChartClientNbaProps> = ({
  data = [],
  dataKey,
  color,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        <p>No data available to display.</p>
      </div>
    );
  }

  if (!dataKey) {
    return (
      <div className="text-center text-gray-500 mt-4">
        <p>Invalid data key.</p>
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
          dataKey="game"
          tick={{ fontSize: 18, fill: "hotpink" }}
          tickFormatter={(value) => `Game ${value}`}
        />

        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey={dataKey}
          fill={color}
          radius={[4, 4, 0, 0]}
          animationDuration={500}
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

export default StatsChartClientNba;
