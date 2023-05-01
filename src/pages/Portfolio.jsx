import Project from "../components/atoms/Project";
import { projects } from "../data/projects";

const Portfolio = () => {
  return (
    <div className="w-full pt-20 md:pt-24 pb-10">
      <div className="flex justify-center items-center flex-col">
        <div className="px-5 mt-5 max-w-7xl">
          <div className="flex flex-wrap flex-col md:flex-row gap-5">
            {projects.map((project) => (
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
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
