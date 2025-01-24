import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <Image src="/next.svg" alt="Next.js Logo" width={100} height={100} />
      <Link href="/Josh-Allen">Josh Allen</Link>
      <Link href="/Patrick-Mahomes">Patrick Mahomes</Link>
    </div>
  );
}
