import { Inter } from "next/font/google";
import Competitor from "@/components/Competitor";
import RankingHeader from "@/components/RankingHeader";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Ranking() {
  const [competitors, setCompetitors] = useState([]);
  const [sortBy, setSortBy] = useState("monthScore"); // initial sort by month score
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCompetitors() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://tapago-api-production.up.railway.app/api"
        );
        const data = await response.json();
        const mappedData = data.map((competitor) => {
          const biggestScore = competitor.userGroups.reduce((acc, group) => {
            if (group.score > acc) {
              return group.score;
            }
            return acc;
          }, 0);
          const sortedGroups = competitor.userGroups.sort(
            (a, b) => b.score - a.score
          );
          const monthScore = sortedGroups[0].monthScore;
          return {
            ...competitor,
            biggestScore,
            userGroups: sortedGroups,
            monthScore,
          };
        });
        const sortedData = mappedData.sort((a, b) => b[sortBy] - a[sortBy]); // sort by current sorting method

        setCompetitors(sortedData);
        setIsLoading(false);
        return data;
      } catch (error) {
        console.error(error);
      }
    }
    fetchCompetitors();
  }, [sortBy]); // re-fetch competitors when sort method changes

  return (
    <>
      <div>
        <RankingHeader setSortBy={setSortBy} />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {competitors.map((competitor, index) => (
            <Competitor
              key={competitor.iid}
              iid={competitor.iid}
              name={competitor.name}
              imgURL={competitor.imgURL}
              userGroups={competitor.userGroups}
              rank={index + 1}
            />
          ))}
        </>
      )}
    </>
  );
}
