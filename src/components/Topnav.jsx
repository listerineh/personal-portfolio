import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Topnav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  return (
    <nav className="flex justify-between absolute h-16 box-border w-full bg-black rounded-b-2xl cursor-default">
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
            className="absolute z-4 right-5 w-5 h-5 p-5"
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
              <a
                href="#"
                className="md:hover:border-indigo-600 md:hover:border-b-2 md:hover:text-white hover:text-indigo-600 transition-transform"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="md:hover:border-indigo-600 md:hover:border-b-2 md:hover:text-white hover:text-indigo-600 transition-transform"
              >
                Information
              </a>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};

export default Topnav;
