import React, { useEffect } from "react";
import Calendar from "../../components/calendar";
import { useRouter } from "next/router";
import style from "./Search.module.css";
import Loading from "@/components/Loading";

function App() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState({
    name: "Boris Bilder",
    userGroups: [],
  });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [allUsers, setAllUsers] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState([]);

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
        setFilteredUsers([]);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://tapago-api-production.up.railway.app/api/`
        );
        const data = await response.json();
        setAllUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered.slice(-3));
  };

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

  const handleUserClick = (id) => {
    router.push(`/user/history?id=${id}`);
  };

  return (
    <div className={style.view}>
      {loading ? (
        <Loading />
      ) : (
        <div className={style.container}>
          <h1>{user.name}</h1>
          <div className={style.calendarContainer}>
            {userGroups.length > 0 ? (
              generateCalendar(userGroups)
            ) : (
              <p>Procure por usuários:</p>
            )}
          </div>
        </div>
      )}
      <div className={style.searchContainer}>
        <input
          type="text"
          placeholder="Search user"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {filteredUsers.length > 0 && (
        <div className={style.search}>
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id} onClick={() => handleUserClick(user.iid)}>
                <div className={style.userCard}>
                  <div className={style.userAvatar}>{user.name.charAt(0)}</div>
                  <div className={style.name}>{user.name}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
