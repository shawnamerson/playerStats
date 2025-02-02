import React from "react";
import { PlayerDataNba } from "@/app/types/PlayerData"; // Import the type
import Image from "next/image";

interface PlayerDataNbaProps {
  playerDataNba: PlayerDataNba;
}

const PlayerDataNbaComponent: React.FC<PlayerDataNbaProps> = ({
  playerDataNba,
}) => {
  const { image_url, player_name, position, league } = playerDataNba;

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        {/* Image with fallback */}
        <Image
          src={image_url || "/default-player-image.jpg"}
          alt={`${player_name}'s photo`}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-xl font-bold">
            {player_name || "Unknown Player"}
          </h3>
          <p className="text-lg text-lime-400">
            {position || "Unknown Position"}
          </p>
          <p className="text-sm text-gray-400">
            League: {league?.toUpperCase() || "Unknown League"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerDataNbaComponent;
