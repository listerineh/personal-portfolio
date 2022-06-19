import { Link } from "react-router-dom";
import Topnav from "../components/Topnav";
import { projects } from "../data/projects";

const Portfolio = () => {
  return (
    <>
      <Topnav />
      <div className="md:flex">
        <div className="md:w-3/12"></div>
        <div className="md:w-6/12 mx-5 mb-14">
          {projects.map((project) => (
            <div key={project.name}>
              <h2 className="mt-5 text-3xl text-indigo-600 font-bold">
                <Link to={project.url}>{project.title}</Link>
              </h2>
              <Link to={project.url} rel="noopener noreferrer">
                <img
                  src={project.photo}
                  className="border-indigo-500 border-2 mt-2"
                />
              </Link>
              <p className="text-white text-base">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Portfolio;
