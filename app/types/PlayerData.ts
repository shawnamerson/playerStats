// types/PlayerData.ts

export interface PlayerDataNba {
    player_id: number;
    player_name: string;
    league: "nba";
    position: string;
    image_url: string | null; // Nullable because image_url might be missing
  }

  // types/PlayerData.ts

export interface PlayerDataNfl {
  player_id: number;
  player_name: string;
  league: "nfl";
  position: string;
  image_url: string | null; // Nullable because image_url might be missing
}

  