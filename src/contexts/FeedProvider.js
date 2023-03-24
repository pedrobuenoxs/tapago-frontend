// contexts/FeedProvider.js

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";

import { api } from "@/service/api";

const FeedContext = createContext({});

export const FeedProvider = ({ children }) => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const feed = user.groups.map((group) => {
      const res = api.get(`feed/group/${group}`).then((response) => {
        return response.data;
      });
      return res;
    });
    Promise.all(feed)
      .then((response) => {
        const sort = response
          .sort((a, b) => {
            return b.length - a.length;
          })
          .slice(0, 3);
        setGroups(sort);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [user.groups]);
  return (
    <FeedContext.Provider value={{ groups, loading }}>
      {children}
    </FeedContext.Provider>
  );
};

export const useFeed = () => useContext(FeedContext);
