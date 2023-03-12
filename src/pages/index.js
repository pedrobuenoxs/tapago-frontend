import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import Feed from "@/components/Feed";

export default function Home() {
  return (
    <div className="container">
      <Feed />
    </div>
  );
}
