import Project from "../components/molecules/Project";
import { useEffect, useState } from "react";
import { projects } from "../data/projects";

const Portfolio = () => {
  const categories = ["All", "Web", "Desktop"];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [projectsToShow, setProjectsToShow] = useState([]);

  useEffect(() => {
    setActiveCategory(categories[0]);
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setProjectsToShow(projects);
    } else {
      setProjectsToShow(
        projects.filter((project) => project.icon.includes(activeCategory))
      );
    }
    console.log(projects);
  }, [activeCategory]);

  return (
    <div className="w-full pt-20 md:pt-24 pb-10">
      <section className="w-full mb-3 text-on-background dark:text-on-background-dark">
        <ul className="flex justify-center gap-3">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => setActiveCategory(category)}
                className={` ${
                  category === activeCategory && "border-secondary-variant"
                } border-b-2 md:hover:border-secondary dark:md:hover:border-secondary-dark transition-all p-2`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className="flex justify-center items-center flex-col">
        <article className="px-5 mt-5 max-w-7xl">
          <div className="flex flex-wrap flex-col md:flex-row gap-5">
            {projectsToShow.map((project) => (
              <Project
                key={project.id}
                to={project.id}
                icon={project.icon}
                description={project.description}
                title={project.title}
                image={project.photo[0]}
                stack={project.stack}
                codeURL={project?.repo}
                siteURL={project?.demo}
              />
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Portfolio;
