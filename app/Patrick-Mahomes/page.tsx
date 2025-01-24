import StatsChartServer from "@/components/StatsChartServer";
import { ChartConfig } from "@/components/ui/chart";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const chartConfig = {
  passingAttempts: { label: "Passing Attempts", color: "#000000" },
  passingCompletions: { label: "Passing Completions", color: "#000000" },
  passingYards: { label: "Passing Yards", color: "#000000" },
  passingTouchdowns: { label: "Passing Touchdowns", color: "#000000" },
  interceptions: { label: "Interceptions", color: "#000000" },
  longestPass: { label: "Longest Pass", color: "#000000" },
  sacked: { label: "Sacked", color: "#000000" },
  rushingAttempts: { label: "Rushing Attempts", color: "#000000" },
  rushingYards: { label: "Rushing Yards", color: "#000000" },
  rushingTouchdowns: { label: "Rushing Touchdowns", color: "#000000" },
  longestRush: { label: "Longest Rush", color: "#000000" },
} satisfies ChartConfig;

export default async function QuarterbackStatsPage() {
  // Fetch data from Supabase
  const { data: stats, error } = await supabase
    .from("patrickMahomes")
    .select("*")
    .order("week", { ascending: true });

  if (error) {
    console.error("Error fetching data:", error.message);
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Failed to load stats. Please try again later.</p>
      </div>
    );
  }

  if (!stats || stats.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p>No data available for Patrick Mahomes.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center pt-10">
        Patrick Mahomes Stats
      </h2>
      <div className="grid grid-cols-1">
        {Object.entries(chartConfig).map(([key, config]) => (
          <StatsChartServer
            key={key}
            title={config.label}
            data={stats}
            dataKey={key}
            config={chartConfig}
          />
        ))}
      </div>
    </div>
  );
}
