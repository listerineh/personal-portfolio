import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import Link from "../atoms/Link";

const Topnav = () => {
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
        } fixed flex z-10 justify-between h-16 md:h-20 box-border w-full bg-black rounded-b-2xl cursor-default transition-all duration-300`}
      >
        <h1 className="text-white text-base md:text-lg font-bold p-5 md:p-6">
          Sebastian Alvarez{" "}
          <span className="text-indigo-500 text-sm md:text-base font-light">
            Fullstack Engineer
          </span>
        </h1>
        <button
          className="absolute right-5 w-5 h-5 p-5 md:p-6"
          onClick={handleOpen}
        >
          <FontAwesomeIcon
            icon={isOpen ? faXmark : faBars}
            size="1x"
            className="text-white md:text-gray-700 hover:text-white scale-110 transition-all"
          />
        </button>
      </nav>

      {isOpen && (
        <nav
          className="absolute z-20 w-full h-screen bg-custom-dark-light"
          style={{ top: `${window.pageYOffset}px` }}
        >
          <button
            className="absolute right-5 w-5 h-5 p-5 md:p-6"
            onClick={handleOpen}
          >
            <FontAwesomeIcon
              icon={isOpen ? faXmark : faBars}
              size="1x"
              className="text-white md:text-gray-700 hover:text-white scale-110 transition-all"
            />
          </button>
          <ul className="flex flex-col gap-y-5 w-full h-full items-center justify-center text-white text-2xl">
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
