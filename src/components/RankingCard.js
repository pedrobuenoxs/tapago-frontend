import { useState, useEffect } from "react";
import Competitor from "./Competitor";

const CompetitorList = ({ competitors }) => {
  return (
    <div>
      {competitors.map((competitor, index) => (
        <Competitor
          key={competitor.iid}
          iid={competitor.iid}
          name={competitor.name}
          imgURL={competitor.imgURL}
          userGroups={userGroups}
          rank={index + 1}
        />
      ))}
    </div>
  );
};

export default CompetitorList;
