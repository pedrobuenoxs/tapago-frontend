import React, { useState } from "react";
import styles from "./Stats.module.css";
import RadarChart from "./RadarChart";

function Stats({ data }) {
  const [openedGroupIndex, setOpenedGroupIndex] = useState(-1);

  const renderDayCountsChart = (group) => {
    const days = Object.keys(group.analytics.days);
    const counts = Object.values(group.analytics.days);

    const labels = [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sabado",
      "Domingo",
    ];

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Qtd por dia",
          data: counts,
          fill: true,
          backgroundColor: "RGB(175, 83, 84,0.3)", // Changed to a lighter yellow color
          borderColor: "RGB(175, 83, 84)", // Changed to a solid yellow color
          pointBackgroundColor: "RGB(175, 83, 84)", // Changed to a solid yellow color
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "RGB(175, 83, 84)", // Changed to a solid yellow color
        },
      ],
    };

    const options = {
      scales: {
        r: {
          ticks: {
            color: "black", // Set the color for the radial axis ticks
          },
          pointLabels: {
            color: "rgba(255, 255, 255, 1)", // Set the color for the point labels
          },
          grid: {
            color: "rgba(255, 255, 255, 0.2)", // Set the color for the grid lines
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "black", // Set the color for the legend labels
          },
        },
      },
    };

    return <RadarChart data={chartData} options={options} />;
  };

  const handleGroupClick = (index) => {
    if (openedGroupIndex === index) {
      setOpenedGroupIndex(-1);
    } else {
      setOpenedGroupIndex(index);
    }
  };

  return (
    <div className={styles.statsContainer}>
      <h2 className={styles.title}>Meus números</h2>
      <h3 className={styles.subTitle}>Groupos</h3>
      {data.userGroups.map((group, index) => (
        <div
          key={index}
          className={styles.groupInfo}
          onClick={() => handleGroupClick(index)}
        >
          <div className={styles.header}>
            <h4 className={styles.groupTitle}>{group.name}</h4>
            <p className={styles.text}>
              🔺
              {group.score}
            </p>
          </div>
          {openedGroupIndex === index && (
            <>
              <h5 className={styles.sectionTitle}>Analytics:</h5>
              <div>
                <p className={styles.text}>Geralmente voce treina as:</p>
                <p className={styles.text}>{group.analytics.hourMedia}</p>
              </div>
              {renderDayCountsChart(group)}
              <h5 className={styles.sectionTitle}>Scores:</h5>
              <ul className={styles.list}>
                {group.scores.map((score, i) => (
                  <li className={styles.listItem} key={i}>
                    {score.score} - {score.date.split("/")[0]}/
                    {score.date.split("/")[1]}
                    {" às "}
                    {score.time &&
                      `${score.time.split(":")[0]}:${
                        score.time.split(":")[1]
                      }h`}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Stats;
