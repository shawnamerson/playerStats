import { createClient } from "@supabase/supabase-js";
import PlayerCardNba from "@/app/components/PlayerCardNba";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getServerSideProps({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Fetch stats for the given player
  const { data: stats, error: statsError } = await supabase
    .from("game_stats")
    .select("game, player_id, opponent, venue")
    .eq("slug", slug);

  if (statsError) {
    return { props: { error: statsError.message } };
  }

  // Fetch player details (position, image_url, player_name)
  const { data: playerDataNba, error: playerError } = await supabase
    .from("players")
    .select("position, image_url, player_name")
    .eq("slug", slug)
    .single();

  if (playerError) {
    return { props: { error: playerError.message } };
  }

  return {
    props: {
      stats,
      playerDataNba,
    },
  };
}

export default function PlayerStatsPage({
  stats,
  playerDataNba,
  error,
}: {
  stats: any;
  playerDataNba: any;
  error?: string;
}) {
  if (error) {
    return <div>Error: {error}</div>;
  }

  const playerName = playerDataNba?.player_name || "Unknown Player";
  const playerImageUrl = playerDataNba?.image_url || "";
  const position = playerDataNba?.position || "Unknown Position";

  return (
    <div>
      <h1>{playerName}'s Stats</h1>
      <PlayerCardNba
        name={playerName}
        imageUrl={playerImageUrl}
        position={position}
      />
      {/* Render stats here */}
    </div>
  );
}
