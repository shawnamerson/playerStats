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

interface StatsChartClientProps {
  data: { week: string | number; [key: string]: any }[];
  dataKey: string;
  color: string;
}

const StatsChartClient: React.FC<StatsChartClientProps> = ({
  data,
  dataKey,
  color,
}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <XAxis
          dataKey="week"
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `Week ${value}`}
        />
        <Tooltip />
        <Bar
          dataKey={dataKey}
          fill={color}
          radius={[4, 4, 0, 0]} // Top rounded corners
        >
          <LabelList dataKey={dataKey} position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatsChartClient;
