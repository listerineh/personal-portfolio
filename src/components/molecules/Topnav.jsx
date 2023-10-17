import { useState, useRef, useEffect } from "react";
import { Link as Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const Topnav = ({ handleThemeSwitch, theme }) => {
  const [visible, setVisible] = useState(true);
  const prevScrollPos = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(
        prevScrollPos.current > currentScrollPos || currentScrollPos === 0
      );
      prevScrollPos.current = currentScrollPos;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`${
          visible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform -translate-y-full"
        } fixed max-w-[1350px] flex z-20 p-5 md:p-6 justify-between h-16 md:h-20 box-border w-full bg-primary-variant dark:bg-surface-dark rounded-b-2xl shadow-md cursor-default duration-300`}
      >
        <h1 className="flex gap-3 text-on-primary dark:text-on-background-dark text-base md:text-lg font-bold">
          <img src="/favicon.svg" />
          <Redirect to="/" className="cursor-pointer">
            Sebastian Alvarez{" "}
            <span className="text-on-surface-dark dark:text-primary-dark font-light text-sm">
              Fullstack Developer
            </span>
          </Redirect>
        </h1>
        <button onClick={handleThemeSwitch}>
          <FontAwesomeIcon
            icon={theme === "dark" ? faMoon : faSun}
            size="1x"
            className="text-yellow-600 dark:text-white md:text-yellow-300 dark:md:text-secondary-variant dark:md:hover:text-secondary md:hover:text-yellow-500 md:hover:scale-110 transition-all"
          />
        </button>
      </nav>
    </>
  );
};

export default Topnav;
