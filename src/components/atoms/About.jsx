import SocialMedia from "./SocialMedia";
import Me from "../../assets/images/me.png";
import { about } from "../../data/information";

const About = () => {
  return (
    <article className="md:px-28 px-10 mt-10 md:mb-0 mb-10 cursor-default max-w-7xl">
      <div className="flex flex-col text-on-background dark:text-on-background-dark md:pb-0 p-5 md:p-10">
        <p className="md:text-xl text-md font-extralight md:text-start text-center">
          {about.greeting}
        </p>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center py-5">
          <h1 className="md:text-7xl text-5xl font-extrabold mb-5 text-primary dark:text-primary-dark text-center">
            {about.name}
          </h1>
          <img
            src={Me}
            alt="Personal picture of Sebastian Alvarez"
            className="md:absolute block md:right-0 right-auto md:bottom-0 bottom-auto dark:md:opacity-30 md:opacity-40 opacity-100 md:w-auto w-40 md:h-[calc(100vh-15vh)] h-auto"
          />
        </div>
        <p className="md:text-xl text-md text-justify font-extralight mb-5 md:w-3/4">
          {about.text}
        </p>
        <SocialMedia />
      </div>
    </article>
  );
};

export default About;
