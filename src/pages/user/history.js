import React, { useEffect } from "react";
import Calendar from "./calendar";
import { useRouter } from "next/router";
import style from "./History.module.css";
import Slider from "react-slick";

function App() {
  function Loading() {
    return (
      <div className={style.loading}>
        <h2>Loading...</h2>
      </div>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: "-10px", zIndex: 1 }}
        onClick={onClick}
      >
        a
      </div>
    );
  }

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: "-10px", zIndex: 1 }}
        onClick={onClick}
      >
        a
      </div>
    );
  }

  const [loading, setLoading] = React.useState(true);
  const [dates, setDates] = React.useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const handleSwipeLeft = () => {
    setDates((prevDates) => ({ ...prevDates, month: prevDates.month + 1 }));
  };

  const handleSwipeRight = () => {
    setDates((prevDates) => ({ ...prevDates, month: prevDates.month - 1 }));
  };

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
    return userGroups.map((group) => {
      return (
        <Calendar
          key={group.name}
          year={dates.year}
          month={dates.month}
          scores={group.scores}
          groupName={group.name}
        />
      );
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className={style.view}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2>{user.name}</h2>
          <Slider {...settings}>{generateCalendar(userGroups)}</Slider>
        </>
      )}
    </div>
  );
}

export default App;
