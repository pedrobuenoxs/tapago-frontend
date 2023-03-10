import React, { useEffect } from "react";
import Calendar from "./calendar";
import { useRouter } from "next/router";
import style from "./History.module.css";

function App() {
  function Loading() {
    return (
      <div className={style.loading}>
        <h2>Loading...</h2>
      </div>
    );
  }
  const [loading, setLoading] = React.useState(true);

  const [user, setUser] = React.useState({
    name: "Boris Bilder",
    userGroups: [],
  });

  const router = useRouter();
  const { query } = router;
  const { id } = query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://tapago-api-production.up.railway.app/api/${id}`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
    <div className={style.view}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2>{user.name}</h2>
          {generateCalendar(userGroups)}
        </>
      )}
    </div>
  );
}

export default App;
