"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Utility function to convert player name to a slug
const slugify = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

interface Player {
  id: string;
  player_name: string;
  image_url: string;
  league: string;
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedLeague, setSelectedLeague] = useState("nfl");

  // Fetch players from Supabase when the component mounts
  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase
        .from("players")
        .select("id, player_name, image_url, league");

      if (error) {
        console.error("Error fetching players:", error.message);
        return;
      }

      setPlayers(data || []);
    };

    fetchPlayers();
  }, []);

  // Filter players based on search query and selected league
  const filteredPlayers = players.filter(
    (player) =>
      player.league === selectedLeague &&
      player.player_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-black text-lime-400 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-600">
          Player Stats to Help You Win
        </h2>
        <p className="text-center text-lime-400 mb-6">
          Analyze key stats and trends from top players to make smarter bets.
        </p>

        {/* League Selector */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => setSelectedLeague("nfl")}
            className={`px-4 py-2 mx-2 rounded-lg ${
              selectedLeague === "nfl"
                ? "bg-pink-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
            aria-pressed={selectedLeague === "nfl" ? "true" : "false"}
          >
            NFL
          </button>
          <button
            onClick={() => setSelectedLeague("nba")}
            className={`px-4 py-2 mx-2 rounded-lg ${
              selectedLeague === "nba"
                ? "bg-pink-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
            aria-pressed={selectedLeague === "nba" ? "true" : "false"}
          >
            NBA
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search players..."
            className="w-full max-w-md p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Player Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <div
                key={player.id}
                className="bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform p-4"
              >
                <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={player.image_url || "/default-player-image.jpg"}
                    alt={`${player.player_name}'s photo`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="text-center p-4">
                  <h3 className="text-2xl font-bold mb-2">
                    {player.player_name}
                  </h3>
                  <Link
                    href={`/${player.league.toLowerCase()}/${slugify(
                      player.player_name
                    )}`}
                    className="block mt-4 bg-pink-600 text-center text-lime-400 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    View Detailed Stats
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">
              No players match your search.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
