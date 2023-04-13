import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <button
      className={`fixed bottom-4 right-4 text-white ${!isVisible && "hidden"}`}
      onClick={handleClick}
    >
      <FontAwesomeIcon
        icon={faCircleArrowUp}
        size="2x"
        className="text-white md:text-gray-700 hover:text-white hover:scale-110 transition-all"
      />
    </button>
  );
};

export default GoToTopButton;
