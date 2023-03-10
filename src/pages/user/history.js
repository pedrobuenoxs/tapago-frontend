import React, { useEffect } from "react";
import Calendar from "./calendar";
import { useRouter } from "next/router";

function App() {
  const group = {
    name: "Ficar monstrão porra!",
    score: 100,
    scores: [
      {
        id: "63f69da3ff9bd17292443678",
        score: "🦵🏻🫀",
        date: "01/03/2023",
        time: "19:56:35",
      },
      {
        id: "63ffd94b9a11dc71f89a24f6",
        score: "💪🏼🦇🫀",
        date: "02/03/2023",
        time: "20:01:31",
      },
      {
        id: "640107a39a11dc71f89a2622",
        score: "🦵🏻🫀",
        date: "04/03/2023",
        time: "17:31:31",
      },
      {
        id: "640265599a11dc71f89a26cc",
        score: "🫀💪🏼",
        date: "03/03/2023",
        time: "18:23:37",
      },
      {
        id: "64064dbd9f2bc4f4aa6009a9",
        score: "👙🫀",
        date: "06/03/2023",
        time: "17:31:57",
      },
      {
        id: "640901b59f2bc4f4aa600b8c",
        score: "🦵🏻🫀",
        date: "08/03/2023",
        time: "18:44:21",
      },
    ],
  };

  const [user, setUser] = React.useState({
    name: "Boris Bilder",
    userGroups: [group],
  });

  const router = useRouter();
  const { query } = router;
  const { id } = query;
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://tapago-api-production.up.railway.app/api/${id}`
        );
        console.log(response);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const userGroups = user.userGroups;

  const generateCalendar = (groups) => {
    const dates = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    };
    return userGroups.map((group) => {
      return (
        <div key={group.name}>
          <Calendar
            year={dates.year}
            month={dates.month}
            scores={group.scores}
            groupName={group.name}
          />
        </div>
      );
    });
  };

  return (
    <div>
      <h1>{user.name}</h1>
      {generateCalendar(userGroups)}
    </div>
  );
}

export default App;
