import { Outlet } from "react-router-dom";
import Topnav from "../components/Topnav";

import "../styles/background.css";

const Layout = () => {
  return (
    <>
      <Topnav />
      <Outlet />
    </>
  );
};

export default Layout;
