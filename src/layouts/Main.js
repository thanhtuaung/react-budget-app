// rrd import
import { Outlet, useLoaderData } from "react-router";

//helper functions
import { fetchData } from "../helpers";
import Navbar from "../components/Navbar";

// assets
import wave from "../assets/wave.svg";

//loader
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Navbar userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} />
    </div>
  );
};

export default Main;
