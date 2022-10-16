import { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faSafari } from "@fortawesome/free-brands-svg-icons";
import Error404 from "../pages/Error404";
import { projects } from "../data/projects";
import Carousel from "../components/Carousel";
import Title from "../components/Title";

const Project = () => {
  const { id } = useParams();
  const currentProject = projects.filter((project) => project.url === id);

  var imageIndexExists = currentProject.length > 0;
  var project = imageIndexExists ? currentProject[0] : null;
  var numberOfPhotos = imageIndexExists ? project.photo.length : null;

  return (
    <>
      {imageIndexExists ? (
        <div className="md:flex">
          <div className="md:w-2/3 px-5 py-5">
            <Title>{project.title}</Title>
            {numberOfPhotos > 1 ? (
              <Carousel photos={project.photo} />
            ) : (
              <img
                src={project.photo[0]}
                className="border-indigo-500 border-2 mt-2 w-full"
              />
            )}
          </div>
          <div className="md:w-1/3 px-5 md:mt-16">
            <div className="mb-5">
              <h1 className="text-white text-xl font-semibold">Description:</h1>
              <p className="text-white font-extralight">
                {project.description}
              </p>
            </div>

            <div className="mb-5">
              <h1 className="text-white text-xl font-semibold">Stack:</h1>
              {project.stack.map((item) => (
                <pre className="pl-5 text-white" translate="no" key={item}>
                  - {item}
                </pre>
              ))}
            </div>

            <div className="flex bottom-0 mb-5">
              <div className="w-3/4"></div>
              <div>
                <div className="flex gap-x-2">
                  {project.repo && (
                    <a href={project.repo} target="_blank">
                      <FontAwesomeIcon
                        icon={faGithub}
                        size="2x"
                        className="text-white"
                      />
                    </a>
                  )}

                  {project.demo && (
                    <a href={project.demo} target="_blank">
                      <FontAwesomeIcon
                        icon={faSafari}
                        size="2x"
                        className="text-white"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error404 />
      )}
    </>
  );
};

export default Project;
