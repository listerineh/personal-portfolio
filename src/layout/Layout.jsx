import { Outlet } from "react-router-dom";
import Topnav from "../components/molecules/Topnav";
import Footer from "../components/molecules/Footer";
import GoToTopButton from "../components/atoms/GoToTopButton";

const Layout = ({ handleThemeSwitch, theme }) => {
  return (
    <main>
      <Topnav handleThemeSwitch={handleThemeSwitch} theme={theme} />
      <Outlet />
      <GoToTopButton />
      <Footer />
    </main>
  );
};

export default Layout;
