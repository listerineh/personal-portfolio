import { Outlet } from "react-router-dom";
import Topnav from "../components/molecules/Topnav";
import Footer from "../components/molecules/Footer";
import GoToTopButton from "../components/atoms/GoToTopButton";
import SlideShow from "../components/atoms/SlideShow";

const Layout = ({ handleThemeSwitch, theme }) => {
  return (
    <div className="flex absolute w-full justify-center max-w-[1350px]">
      <main className="">
        <Topnav handleThemeSwitch={handleThemeSwitch} theme={theme} />
        <SlideShow />
        <Outlet />
        <GoToTopButton />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
