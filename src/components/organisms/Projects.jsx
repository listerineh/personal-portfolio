import Project from "../molecules/Project";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";

const Projects = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="px-5 mt-5">
        <div className="flex flex-col md:flex-row gap-5">
          {projects.slice(0, 3).map((project) => (
            <Project
              key={project.id}
              to={`/projects/${project.id}`}
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
        <div className="w-full flex justify-end py-5">
          <Link
            to="projects"
            className="bg-secondary-variant text-center text-white px-3 py-2 rounded-md md:hover:bg-secondary transition-all w-full md:w-auto"
          >
            See more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projects;
