import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

const Topnav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const prevScrollPos = useRef(0);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  const handleClickScroll = (section) => {
    const element = document.getElementById(section);
    if (element) {
      handleOpen();
      element.scrollIntoView({ behavior: "smooth" });
    }
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
    <nav
      className={`${
        visible
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform -translate-y-full"
      } fixed flex justify-between h-16 box-border w-full bg-black rounded-b-2xl cursor-default transition-all duration-500`}
    >
      <h1 className="text-white font-bold p-5">
        Sebastian Alvarez{" "}
        <span className="text-indigo-500 text-sm font-extralight">
          Fullstack Engineer
        </span>
      </h1>
      <button className="absolute z-4 right-5 w-5 h-5 p-5" onClick={handleOpen}>
        <FontAwesomeIcon
          icon={!isOpen && faBars}
          size="1x"
          className="text-white md:text-gray-700 hover:text-white scale-110 transition-all"
        />
      </button>
      {isOpen && (
        <nav className="absolute z-0 w-full h-screen bg-[rgba(20,20,20,0.95)]">
          <button
            className="absolute z-4 right-9 w-5 h-5 p-5"
            onClick={handleOpen}
          >
            <FontAwesomeIcon
              icon={isOpen && faXmark}
              size="1x"
              className="text-white md:text-gray-700 hover:text-white scale-110 transition-all"
            />
          </button>
          <ul className="flex flex-col gap-y-5 w-full h-full items-center justify-center text-white text-2xl">
            <li>
              <button
                onClick={() => handleClickScroll("home-section")}
                className="border-b-2 border-transparent md:hover:border-indigo-600 md:hover:border-b-2 md:hover:text-white hover:text-indigo-600 transition-transform"
              >
                Welcome
              </button>
            </li>
            <li>
              <button
                onClick={() => handleClickScroll("info-section")}
                className="border-b-2 border-transparent md:hover:border-indigo-600 md:hover:border-b-2 md:hover:text-white hover:text-indigo-600 transition-transform"
              >
                Information
              </button>
            </li>
            <li>
              <button
                onClick={() => handleClickScroll("projects-section")}
                className="border-b-2 border-transparent md:hover:border-indigo-600 md:hover:border-b-2 md:hover:text-white hover:text-indigo-600 transition-transform"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => handleClickScroll("contacs-section")}
                className="border-b-2 border-transparent md:hover:border-indigo-600 md:hover:border-b-2 md:hover:text-white hover:text-indigo-600 transition-transform"
              >
                Contact me
              </button>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};

export default Topnav;
