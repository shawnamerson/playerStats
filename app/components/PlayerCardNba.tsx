import Image from "next/image";

function PlayerCardNba({
  name,
  imageUrl,
  role = "NBA Player",
  position,
}: {
  name: string;
  imageUrl?: string;
  role?: string;
  position: string;
}) {
  return (
    <div className="flex items-center justify-center space-x-4 p-4 shadow-lg rounded-full bg-black w-full max-w-screen-lg mx-auto">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`${name}'s photo`}
          width={300}
          height={300}
          className="rounded-full"
        />
      ) : (
        <div
          className="w-[100px] h-[100px] rounded-full bg-gray-300 flex items-center justify-center"
          aria-label="No image available"
        >
          <span className="text-gray-600 text-sm">No Image</span>
        </div>
      )}
      <div className="flex flex-col justify-center text-center">
        <h3 className="text-xl font-bold text-pink-600">{name}</h3>
        <p className="text-sm text-lime-400">
          {role}
          {position ? ` - ${position}` : ""}
        </p>
      </div>
    </div>
  );
}

export default PlayerCardNba;
