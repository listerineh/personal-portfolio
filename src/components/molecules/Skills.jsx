import { useState } from "react";
import { technologies } from "../../data/knowledges";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as SolidStar,
  faArrowCircleDown,
  faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as LightStar } from "@fortawesome/free-regular-svg-icons";
import Title from "../atoms/Title";

const Skills = () => {
  const [showCount, setShowCount] = useState(1);
  technologies.sort((a, b) => b.grade - a.grade);

  const totalParts = 3;
  const partSize = Math.ceil(technologies.length / totalParts);
  const parts = Array.from({ length: totalParts }, (_, i) =>
    technologies.slice(i * partSize, (i + 1) * partSize)
  );

  const visibleTechnologies = parts.slice(0, showCount).flat();

  const toggleShowAll = () => {
    setShowCount(showCount === totalParts ? 1 : showCount + 1);
  };

  return (
    <article className="px-0 md:px-10 mb-10">
      <Title title="skills" />
      <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center mx-5 md:mx-0 px-5 py-14 transition-all">
        {visibleTechnologies.map((technology) => (
          <div
            key={technology.name}
            className="flex flex-col justify-center items-center md:hover:scale-125 transition-all"
          >
            <img
              src={technology.img}
              alt={technology.name}
              className="w-12 md:w-24"
            />
            <p className="text-on-background dark:text-on-background-dark text-sm md:text-base">
              {technology.name}
            </p>
            <div>
              {[1, 2, 3, 4, 5].map((number) => (
                <span key={number}>
                  <FontAwesomeIcon
                    icon={number <= technology.grade ? SolidStar : LightStar}
                    size="1x"
                    className="text-yellow-400"
                  />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="dark:text-on-primary text-on-primary-dark mx-auto block"
        onClick={toggleShowAll}
      >
        <FontAwesomeIcon
          icon={showCount === totalParts ? faArrowCircleUp : faArrowCircleDown}
          size="1x"
          className="animate-bounce transition-all"
        />
      </button>
    </article>
  );
};

export default Skills;
