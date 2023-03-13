import React, { useState, useEffect } from "react";
import Card from "./Card";
import Loading from "./Loading";

export default function Feed() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://tapago-api-production.up.railway.app/scores`
        );
        const data = await response.json();
        setScores(data.sort((a, b) => a.date - b.date));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function generateScores() {
    return (
      <div>
        {scores.map((record) => (
          <Card key={record.id} record={record} />
        ))}
      </div>
    );
  }

  return <div>{loading ? <Loading /> : generateScores()}</div>;
}
