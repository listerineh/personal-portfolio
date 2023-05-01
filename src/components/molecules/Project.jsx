import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faGlobe,
  faLaptop,
  faMobileScreen,
  faLaptopHouse,
} from "@fortawesome/free-solid-svg-icons";
import ButtonPrincipal from "../atoms/ButtonPrincipal";

const Project = ({
  icon,
  image,
  title,
  description,
  stack,
  codeURL,
  siteURL,
  to,
}) => {
  const icons = {
    Web: faLaptopHouse,
    Mobile: faMobileScreen,
    Desktop: faLaptop,
  };

  const setIcon = () => {
    return icons[icon] || faCode;
  };

  return (
    <Link
      to={to}
      className="flex flex-col justify-between md:w-fix p-3 rounded-xl shadow-xl md:hover:scale-105 transition-all bg-surface dark:bg-surface-dark text-on-surface dark:text-on-surface-dark"
    >
      <div className="relative inline-block">
        <span className="absolute left-[calc(50%-20px)] -top-5 z-10 bg-primary dark:bg-primary-dark text-on-primary dark:text-on-background-dark rounded-full p-2">
          <FontAwesomeIcon icon={setIcon()} size="2x" />
        </span>
        <img
          src={image}
          alt={`Image of ${title} app`}
          className="w-full md:h-48 opacity-80"
        />
        <div className="absolute bottom-0 right-0 z-10">
          <span className="flex gap-x-2">
            {codeURL && (
              <ButtonPrincipal URL={codeURL} icon={faCode} text="View Code" />
            )}
            {siteURL && (
              <ButtonPrincipal URL={siteURL} icon={faGlobe} text="Visit Site" />
            )}
          </span>
        </div>
      </div>
      <h3 className="text-2xl font-semibold py-3 uppercase">{title}</h3>
      <p className="text-">{description}</p>
      <div className="flex flex-wrap justify-center gap-3 w-full bg-background dark:bg-background-dark rounded-xl p-5 mt-3">
        {stack.map((tech) => (
          <span className="text-primary dark:text-primary-dark">{tech}</span>
        ))}
      </div>
    </Link>
  );
};

export default Project;
