import style from "./RankingHeader.module.css";

const RankingHeader = ({ setSortBy }) => {
  return (
    <div className={style.sortBy}>
      <h1>Ranking</h1>
      <div>
        <button onClick={() => setSortBy("monthScore")}>Este mês</button>
        <button onClick={() => setSortBy("biggestScore")}>Total</button>
      </div>
    </div>
  );
};

export default RankingHeader;
