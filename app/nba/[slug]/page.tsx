import React from "react";
import StatsChartServerNba from "@/app/components/StatsChartServerNba"; // Updated import for NBA
import { ChartConfig } from "@/app/components/ui/chart";
import { createClient } from "@supabase/supabase-js";
import PlayerCardNba from "@/app/components/PlayerCardNba"; // Updated import for NBA

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Chart configurations for different positions
const chartConfigsByPosition: Record<string, ChartConfig> = {
  F: {
    minutes: { label: "Minutes Played", color: "limegreen" },
    fieldGoalAttempts: { label: "Field Goal Attempts", color: "limegreen" },
    fieldGoalsMade: { label: "Field Goals Made", color: "limegreen" }, // Fixed label
    receivingtouchdowns: { label: "Receiving Touchdowns", color: "limegreen" },
    longestreception: { label: "Longest Reception", color: "limegreen" },
  },
  // Add other positions (e.g., G for guards, C for centers, etc.)
};

interface PlayerStatsPageProps {
  params: { slug: string };
}

export default async function PlayerStatsPage({
  params,
}: PlayerStatsPageProps) {
  const { slug } = params;

  // Step 1: Fetch the game stats for the given player based on the slug
  const { data: stats, error: statsError } = await supabase
    .from("game_stats")
    .select(
      "game, player_id, minutes, fieldGoalAttempts, fieldGoalsMade, slug, opponent, venue"
    )
    .eq("slug", slug)
    .order("game", { ascending: true });

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

  // Step 2: Fetch the player details (position, image_url, and league)
  const { data: playerDataNba, error: playerError } = await supabase
    .from("players")
    .select("position, image_url, player_name, league")
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

  if (!playerDataNba) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Player data not found.</p>
      </div>
    );
  }

  const playerName = playerDataNba?.player_name || "Unknown Player";
  const position = playerDataNba?.position || "Unknown";
  const playerImageUrl = playerDataNba?.image_url || "";

  // Determine the chart config based on position
  const chartConfig = chartConfigsByPosition[position.toUpperCase()] || {};

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="space-y-6">
        {/* Display PlayerCard at the top */}
        <PlayerCardNba name={playerName} imageUrl={playerImageUrl} />

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {Object.entries(chartConfig).map(([key, config]) => (
            <StatsChartServerNba
              key={key}
              title={config.label as string}
              data={stats.map((stat) => ({
                ...stat,
                game: stat.game,
                opponent: stat.opponent || "", // Handle missing opponent field
                venue: stat.venue || "", // Handle missing venue field
              }))}
              dataKey={key}
              config={config as ChartConfig}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
