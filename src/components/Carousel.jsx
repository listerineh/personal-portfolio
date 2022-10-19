import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Carousel = ({ photos }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const minIndex = 0;
  const maxIndex = photos.length - 1;

  const handleMoveLeft = () => {
    setImageIndex(imageIndex === minIndex ? maxIndex : imageIndex - 1);
  };
  const handleMoveRight = () => {
    setImageIndex(imageIndex === maxIndex ? minIndex : imageIndex + 1);
  };

  return (
    <div className="flex w-full text-center">
      <button
        className="w-1/12 text-slate-500 hover:text-white text-xl hover:text-2xl transition-all"
        onClick={handleMoveLeft}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <img
        src={photos[imageIndex]}
        className="border-indigo-500 border-2 mt-2 w-10/12 transition-all"
      />
      <button
        className="w-1/12 text-slate-500 hover:text-white text-xl hover:text-2xl transition-all"
        onClick={handleMoveRight}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Carousel;
