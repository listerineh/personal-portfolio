import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import Title from "../components/Title";

const Portfolio = () => {
  return (
    <div className="md:flex">
      <div className="md:w-3/12"></div>
      <div className="md:w-6/12 mx-5 mb-14">
        {projects.map((project) => (
          <div key={project.url} className="mt-5">
            <Title>
              <Link to={project.url}>{project.title}</Link>
            </Title>
            <Link to={project.url} rel="noopener noreferrer">
              <img
                src={project.photo[0]}
                className="border-indigo-500 border-2 mt-2 w-full"
              />
            </Link>
            <p className="text-white text-base">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
