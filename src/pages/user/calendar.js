import React from "react";
import style from "./Calendar.module.css";

function Calendar(props) {
  const { year, month, scores, groupName, key } = props;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthStart = new Date(year, month, 1).getDay();
  const monthEnd = new Date(year, month, daysInMonth).getDay();

  // Create an array of dates for the month
  const dates = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(i);
  }

  // Add blank days to the beginning and end of the calendar
  const blankDaysBefore = monthStart === 0 ? 6 : monthStart - 1;
  const blankDaysAfter = monthEnd === 0 ? 0 : 7 - monthEnd;
  for (let i = 0; i < blankDaysBefore; i++) {
    dates.unshift(null);
  }
  for (let i = 0; i < blankDaysAfter; i++) {
    dates.push(null);
  }

  // Render the calendar
  return (
    <div className={style.calendar}>
      <h3>
        {groupName} - {scores.length}/365
      </h3>
      <h4>
        {new Date(year, month).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h4>

      <table>
        <thead>
          <tr>
            <th>Dom</th>
            <th>Seg</th>
            <th>Ter</th>
            <th>Qua</th>
            <th>Qui</th>
            <th>Sex</th>
            <th>Sab</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(Math.ceil(dates.length / 7)).keys()].map((weekIndex) => (
            <tr key={weekIndex}>
              {[...Array(7).keys()].map((dayIndex) => {
                const dateIndex = weekIndex * 7 + dayIndex;
                const date = dates[dateIndex];
                if (date === null) {
                  return <td key={dayIndex}></td>;
                } else {
                  const score = scores.find((score) => {
                    const [scoreDay, scoreMonth, scoreYear] =
                      score.date.split("/");
                    return (
                      scoreDay == date &&
                      scoreMonth == month + 1 &&
                      scoreYear == year
                    );
                  });

                  return (
                    <td key={dayIndex}>
                      <div className="calendar-score">
                        {score
                          ? score.score == "false"
                            ? "✅"
                            : score.score
                          : date}
                      </div>
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
