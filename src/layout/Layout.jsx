import { Outlet } from "react-router-dom";
import Topnav from "../components/molecules/Topnav";
import Footer from "../components/molecules/Footer";
// import "../styles/background.css";

const Layout = () => {
  return (
    <main className="scrollbar-thin scrollbar-thumb-black scrollbar-track-black">
      <Topnav />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
