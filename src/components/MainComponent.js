import Tab from "./Tab";

import style from "./MainComponent.module.css";
import { useAuth } from "../contexts/AuthProvider";
import Login from "./Login";
import { Loader } from "@mantine/core";

export default function MainComponent({ children }) {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Loader size={"lg"} />
      </div>
    );
  }

  return (
    <>
      {auth ? (
        <div className={style.pageContainer}>
          <div className={style.contentWrap}>
            <div>{children}</div>
          </div>
          <Tab />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
