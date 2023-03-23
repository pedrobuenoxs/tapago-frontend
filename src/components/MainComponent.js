import Tab from "./Tab";

import style from "./MainComponent.module.css";
import { useAuth } from "../contexts/AuthProvider";
import Login from "./Login";

export default function MainComponent({ children }) {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
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
