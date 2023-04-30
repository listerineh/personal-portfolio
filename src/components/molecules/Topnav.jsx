import { useState, useRef, useEffect } from "react";
import { Link as Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import Link from "../atoms/Link";

const Topnav = ({ handleThemeSwitch, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const prevScrollPos = useRef(0);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

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
        } fixed flex z-20 p-5 md:p-6 justify-between h-16 md:h-20 box-border w-full bg-primary-variant dark:bg-surface-dark rounded-b-2xl shadow-md cursor-default duration-300`}
      >
        <h1 className="text-on-primary dark:text-on-background-dark text-base md:text-lg font-bold">
          <Redirect to="/" className="cursor-pointer">
            Sebastian Alvarez
          </Redirect>{" "}
          <span className="text-on-surface-dark dark:text-primary-dark font-light">
            Fullstack Engineer
          </span>
        </h1>
        <div className="flex gap-x-5">
          <button onClick={handleThemeSwitch}>
            <FontAwesomeIcon
              icon={theme === "dark" ? faMoon : faSun}
              size="1x"
              className="text-yellow-600 dark:text-white md:text-yellow-300 dark:md:text-gray-700 dark:md:hover:text-white md:hover:text-yellow-500 md:hover:scale-110 transition-all"
            />
          </button>
          <button className="" onClick={handleOpen}>
            <FontAwesomeIcon
              icon={isOpen ? faXmark : faBars}
              size="1x"
              className="text-white md:hover:scale-110 dark:md:text-gray-700 dark:md:hover:text-white transition-all"
            />
          </button>
        </div>
      </nav>

      {isOpen && (
        <nav
          className="absolute z-50 w-full h-screen bg-secondary dark:bg-surface-dark"
          style={{ top: `${window.pageYOffset}px` }}
        >
          <button
            className="absolute right-5 w-5 h-5 p-5 md:p-6"
            onClick={handleOpen}
          >
            <FontAwesomeIcon
              icon={isOpen ? faXmark : faBars}
              size="1x"
              className="text-on-secondary dark:text-on-surface-dark scale-110 transition-all"
            />
          </button>
          <ul className="flex flex-col font-semibold gap-y-4 w-full h-full items-center justify-center text-on-secondary dark:text-on-surface-dark text-2xl">
            <Link
              text="Welcome"
              section="home-section"
              handleOpen={handleOpen}
            />
            <Link
              text="Skills"
              section="skills-section"
              handleOpen={handleOpen}
            />
            <Link
              text="Education"
              section="education-section"
              handleOpen={handleOpen}
            />
            <Link
              text="Experience"
              section="experience-section"
              handleOpen={handleOpen}
            />
            <Link
              text="Projects"
              section="projects-section"
              handleOpen={handleOpen}
            />
            <Link
              text="Achivements"
              section="achivements-section"
              handleOpen={handleOpen}
            />
            <Link
              text="Contact me"
              section="contacs-section"
              handleOpen={handleOpen}
            />
          </ul>
        </nav>
      )}
    </>
  );
};

export default Topnav;
