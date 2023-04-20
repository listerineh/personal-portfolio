import { useEffect, useState } from "react";
import { technologies, categories } from "../../data/knowledges";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as SolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as LightStar } from "@fortawesome/free-regular-svg-icons";

const Skills = () => {
  const [selected, setSelected] = useState("");
  const [technologiesToShow, setTechnologiesToShow] = useState([]);

  const handleSelectChange = (event) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    setSelected(categories[0]);
  }, []);

  useEffect(() => {
    setTechnologiesToShow(
      technologies
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((technology) => technology.category.includes(selected))
    );
  }, [selected]);

  return (
    <article className="px-5 md:px-10 mb-5">
      <div className="flex justify-end md:px-0 px-5 py-5">
        <select
          value={selected}
          onChange={handleSelectChange}
          className="bg-custom-gray text-white w-52 rounded-md outline-none py-2 px-4 cursor-pointer"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center mx-5 md:mx-0 px-5 py-14 bg-custom-gray rounded-md shadow-lg">
        {technologiesToShow.map((technology) => (
          <div
            key={technology.name}
            className="flex flex-col justify-center items-center md:hover:scale-125 transition-all"
          >
            <img
              src={technology.img}
              alt={technology.name}
              className="w-12 md:w-24"
            />
            <p className="text-white text-sm md:text-base">{technology.name}</p>
            <div>
              {[1, 2, 3, 4, 5].map((number) => (
                <span key={number}>
                  {number <= technology.grade ? (
                    <FontAwesomeIcon
                      icon={SolidStar}
                      size="1x"
                      className="text-yellow-400"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={LightStar}
                      size="1x"
                      className="text-yellow-400"
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Skills;
