import { Outlet } from "react-router-dom";
import Topnav from "../components/Topnav";
import Footer from "../components/Footer";
import "../styles/background.css";

const Layout = () => {
  return (
    <main>
      <Topnav />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
