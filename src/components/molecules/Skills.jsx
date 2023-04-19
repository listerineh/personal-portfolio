import { useEffect, useState } from "react";
import { technologies, categories } from "../../data/knowledges";

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

  const handleSelect = (category) => {
    setSelected(category);
  };

  return (
    <article className="px-5 md:px-10 mb-5">
      <div className="flex justify-end p-5">
        <select
          value={selected}
          onChange={handleSelectChange}
          className="bg-zinc-900 text-white w-52 rounded-xl outline-none py-2 px-4 cursor-pointer"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-4 justify-center mx-5 md:mx-0 px-5 py-14 bg-zinc-900 rounded-xl shadow-lg">
        {technologiesToShow.map((technology) => (
          <img
            key={technology.name}
            src={technology.img}
            alt={technology.name}
            className="w-12 md:w-24 md:hover:scale-125 transition-all"
          />
        ))}
      </div>
    </article>
  );
};

export default Skills;
