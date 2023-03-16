import Tab from "./Tab";

import style from "./MainComponent.module.css";

export default function MainComponent({ children }) {
  return (
    <div className={style.pageContainer}>
      <div className={style.contentWrap}>
        <div>{children}</div>
      </div>

      <Tab />
    </div>
  );
}
