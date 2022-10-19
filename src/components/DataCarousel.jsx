import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import Title from "./Title";

const DataCarousel = ({ data, title, colsNumber }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const minIndex = 0;
  const maxIndex = data.length - 1;

  const handleMoveLeft = () => {
    setCurrentIndex(currentIndex === minIndex ? maxIndex : currentIndex - 1);
  };
  const handleMoveRight = () => {
    setCurrentIndex(currentIndex === maxIndex ? minIndex : currentIndex + 1);
  };

  return (
    <div className="text-center mx-10">
      <Title>{title}</Title>
      <div className="grid bg-[rgba(0,0,0,0.4)] rounded-lg my-4 p-10">
        <div className="flex w-full text-center text-white">
          <button
            onClick={handleMoveLeft}
            className="w-1/12 text-slate-500 hover:text-white text-xl hover:text-2xl transition-all"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className={`md:grid md:grid-cols-${colsNumber} block w-10/12`}>
            <div className="grid content-center">
              <p className="text-2xl md:text-3xl">{data[currentIndex].title}</p>
              <p
                className={`text-white ${
                  data[currentIndex].location
                    ? "text-base"
                    : "text-sm font-light"
                }`}
              >
                {data[currentIndex].location
                  ? data[currentIndex].location
                  : data[currentIndex].description}
              </p>
              <p className="font-extralight">{data[currentIndex].timerange}</p>
            </div>
            <div>
              {data[currentIndex].extras ? (
                <>
                  <p className="text-sm font-bold text-white">
                    {data[currentIndex].subtitle}:
                  </p>
                  <div className="text-left text-sm md:pl-8 font-extralight pl-5">
                    {data[currentIndex].extras.map((member) => (
                      <p key={member.body}>- {member.body}</p>
                    ))}
                  </div>
                </>
              ) : null}
              {data[currentIndex].credential ? (
                <a
                  href={data[currentIndex].credential}
                  target="_blank"
                  className="text-green-400 hover:text-green-300 text-md transition-all"
                >
                  <FontAwesomeIcon icon={faLink} />
                </a>
              ) : null}
            </div>
          </div>
          <button
            onClick={handleMoveRight}
            className="w-1/12 text-slate-500 hover:text-white text-xl hover:text-2xl transition-all"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataCarousel;
