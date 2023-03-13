import Tab from "./Tab";

function MainComponent({ children }) {
  return (
    <>
      <div>{children}</div>
      <Tab />
    </>
  );
}

export default MainComponent;
