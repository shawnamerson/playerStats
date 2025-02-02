import Link from "next/link";
import { Home } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full z-10 bg-black py-6 shadow-lg text-lime-400">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold">Bettor&apos;s Playbook</h1>
        </div>
        <nav className="space-x-6 flex items-center">
          <Link
            href="/"
            className="hover:text-yellow-400 flex items-center space-x-2"
          >
            <Home size={35} /> {/* Icon */}
            <span className="sr-only">Home</span> {/* Accessible hidden text */}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
