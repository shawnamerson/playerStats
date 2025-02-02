import StatsChartServerNfl from "@/app/components/StatsChartServerNfl";
import { ChartConfig } from "@/app/components/ui/chart";
import { createClient } from "@supabase/supabase-js";
import PlayerCardNfl from "@/app/components/PlayerCardNfl";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Chart configurations for different positions
const chartConfigsByPosition: Record<string, ChartConfig> = {
  QB: {
    passingattempts: { label: "Passing Attempts", color: "limegreen" },
    passingcompletions: { label: "Passing Completions", color: "limegreen" },
    passingyards: { label: "Passing Yards", color: "limegreen" },
    passingtouchdowns: { label: "Passing Touchdowns", color: "limegreen" },
    interceptions: { label: "Interceptions", color: "limegreen" },
    longestpass: { label: "Longest Pass", color: "limegreen" },
    sacked: { label: "Sacked", color: "limegreen" },
    rushingattempts: { label: "Rushing Attempts", color: "limegreen" },
    rushingyards: { label: "Rushing Yards", color: "limegreen" },
    rushingtouchdowns: { label: "Rushing Touchdowns", color: "limegreen" },
    longestrush: { label: "Longest Rush", color: "limegreen" },
  },
  RB: {
    rushingattempts: { label: "Rushing Attempts", color: "#1E88E5" },
    rushingyards: { label: "Rushing Yards", color: "limegreen" },
    rushingtouchdowns: { label: "Rushing Touchdowns", color: "limegreen" },
    longestrush: { label: "Longest Rush", color: "limegreen" },
  },
  TE: {
    receivingtargets: { label: "Receiving Targets", color: "limegreen" },
    receptions: { label: "Receptions", color: "limegreen" },
    receivingyards: { label: "Receiving Yards", color: "limegreen" },
    receivingtouchdowns: { label: "Receiving Touchdowns", color: "limegreen" },
    longestreception: { label: "Longest Reception", color: "limegreen" },
  },
  // Add other positions if needed
};

interface PlayerDataNfl {
  player_name: string;
  position: string;
  image_url: string;
}

export default async function PlayerStatsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Step 1: Fetch the game stats for the given player based on the slug
  const { data: playerDataNfl, error: playerError } = await supabase
    .from("players")
    .select("position, image_url, player_name")
    .eq("id", slug)
    .single(); // We expect one player, so use .single()

  if (playerError) {
    console.error("Error fetching player data:", playerError.message);
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Failed to load player data. Please try again later.</p>
      </div>
    );
  }

  if (!playerDataNfl) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Player data not found.</p>
      </div>
    );
  }

  // Type the fetched data as PlayerDataNfl
  const playerName =
    (playerDataNfl as PlayerDataNfl)?.player_name || "Unknown Player";
  const position = (playerDataNfl as PlayerDataNfl)?.position || "Unknown";
  const playerImageUrl = (playerDataNfl as PlayerDataNfl)?.image_url || "";

  // Determine the chart config based on position
  const chartConfig = chartConfigsByPosition[position.toUpperCase()] || {};

  if (Object.keys(chartConfig).length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p>No chart configuration available for this position.</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="space-y-6">
        {/* Display PlayerCard at the top */}
        <PlayerCardNfl name={playerName} imageUrl={playerImageUrl} />
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {Object.entries(chartConfig).map(([key, config]) => (
            <StatsChartServerNfl
              key={key}
              title={typeof config.label === "string" ? config.label : ""}
              data={(
                playerDataNfl as PlayerDataNfl & { stats: any[] }
              ).stats.map((stat) => ({
                ...stat,
                game: stat.week, // Use 'week' for NFL
                opponent: stat.opponent || "", // Ensure opponent exists
                venue: stat.venue || "", // Ensure venue exists
              }))}
              dataKey={key}
              config={config as ChartConfig}
            />
          ))}
        </div>{" "}
      </div>
    </div>
  );
}
