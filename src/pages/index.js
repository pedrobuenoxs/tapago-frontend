import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import Feed from "@/components/Feed";

export default function Home() {
  return (
    <>
      <Feed />
    </>
  );
}
