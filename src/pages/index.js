import { Inter } from "next/font/google";
import { useAuth } from "../contexts/AuthProvider";
import StatsControls from "@/components/StatsCard";
import { useEffect, useState } from "react";
import { useFeed } from "@/contexts/FeedProvider";

const inter = Inter({ subsets: ["latin"] });

export default function Feed() {
  const { loading } = useFeed();
  const changeGroup = (id) => {};

  if (loading) return <div>Loading...</div>;

  return <div>{<StatsControls />}</div>;
}
