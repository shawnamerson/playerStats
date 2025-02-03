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

export default async function PlayerStatsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Step 1: Fetch the game stats for the given player based on the slug (assuming slug is used to identify the player)
  const { data: stats, error: statsError } = await supabase
    .from("game_stats")
    .select(
      "week, player_name, slug, opponent, passingattempts, passingcompletions, passingyards, passingtouchdowns, interceptions, longestpass, sacked, rushingattempts, rushingyards, rushingtouchdowns, longestrush, receivingtargets, receptions, receivingyards, receivingtouchdowns, longestreception, player_id, venue"
    )
    .eq("slug", slug)
    .order("week", { ascending: true });

  if (statsError) {
    console.error("Error fetching stats:", statsError.message);
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Failed to load stats for {slug}. Please try again later.</p>
      </div>
    );
  }

  if (!stats || stats.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p>No stats available for {slug}.</p>
      </div>
    );
  }

  const playerId = stats[0]?.player_id; // Get player_id from the game_stats

  // Step 2: Fetch the player details (position and image_url) from the players table using player_id
  const { data: playerDataNfl, error: playerError } = await supabase
    .from("players")
    .select("position, image_url, player_name")
    .eq("id", playerId)
    .single(); // We expect one player, so use .single() to return just one result

  if (playerError) {
    console.error("Error fetching player data:", playerError.message);
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Failed to load player data. Please try again later.</p>
      </div>
    );
  }

  const playerName = playerDataNfl?.player_name || "Unknown Player";
  const position = playerDataNfl?.position || "Unknown";
  const playerImageUrl = playerDataNfl?.image_url || "";

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
        <PlayerCardNfl
          name={playerName}
          imageUrl={playerImageUrl}
          position={position}
        />

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {Object.entries(chartConfig).map(([key, config]) => (
            <StatsChartServerNfl
              key={`${slug}-${key}`}
              title={config.label as string}
              data={stats.map((stat) => ({ ...stat, game: stat.week }))} // Use 'week' for NFL
              dataKey={key}
              config={chartConfig}
            />
          ))}{" "}
        </div>
      </div>
    </div>
  );
}
