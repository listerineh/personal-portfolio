import { useState } from "react";
import Project from "../molecules/Project";
import { projects } from "../../data/projects";

const Projects = () => {
  const [numToShow, setNumToShow] = useState(3);
  const projectsToShow = projects.slice(0, numToShow);

  const groupedProjects = [];
  for (let i = 0; i < projectsToShow.length; i += 3) {
    groupedProjects.push(projectsToShow.slice(i, i + 3));
  }

  const loadMore = () => {
    if (numToShow >= projects.length) {
      setNumToShow(3);
    } else {
      setNumToShow(numToShow + 3);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="px-5 mt-5">
        {groupedProjects.map((group, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-5">
            {group.map((project) => (
              <Project
                key={project.id}
                icon={project.icon}
                description={project.description}
                title={project.title}
                image={project.photo}
                stack={project.stack}
                codeURL={project?.repo}
                siteURL={project?.demo}
              />
            ))}
          </div>
        ))}
        <div className="w-full flex justify-center py-5">
          <button
            className="w-full md:w-auto bg-primary dark:bg-primary-dark text-on-primary md:hover:bg-primary-variant text-center px-3 py-2 rounded-md transition-all"
            onClick={loadMore}
          >
            {numToShow >= projects.length ? "See less" : "See more"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
