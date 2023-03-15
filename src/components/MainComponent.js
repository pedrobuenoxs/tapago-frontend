import Tab from "./Tab";

export default function MainComponent({ children }) {
  return (
    <>
      <div>{children}</div>
      <Tab />
    </>
  );
}
