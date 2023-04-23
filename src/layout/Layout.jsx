import { Outlet } from "react-router-dom";
import Topnav from "../components/molecules/Topnav";
import Footer from "../components/molecules/Footer";

const Layout = ({ handleThemeSwitch, theme }) => {
  return (
    <main>
      <Topnav handleThemeSwitch={handleThemeSwitch} theme={theme} />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
