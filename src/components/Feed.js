import React, { useState, useEffect } from "react";
import Card from "./Card";
import style from "./Feed.module.css";

export default function Feed() {
  const [scores, setScores] = useState([
    {
      id: "640c8c4abe3edcbf79680e3e",
      score: "false",
      date: "11/03/2023",
      time: "11:12:26",
      group: {
        name: "Tá Pago 2023 🦾",
        id: "120363042188580941@g.us",
      },
      user: {
        name: "Leozin",
        id: "5514996836753@s.whatsapp.net",
        iid: "640c8c31be3edcbf79680e39",
      },
    },
  ]);
  const [groupName, setGroupName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://tapago-api-production.up.railway.app/scores`
      );
      const data = await response.json();
      console.log(data.sort((a, b) => a.date - b.date));
      setScores(data);
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

  return (
    <div>
      <div className={style.header}>
        <h1>Geral</h1>
      </div>
      {generateScores()}
    </div>
  );
}
