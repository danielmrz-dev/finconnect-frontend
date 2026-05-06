import { Outlet } from "react-router";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <>
      <Outlet />
      <Navbar/>
    </>
  );
}

export default App;
