import { about } from "../../data/information";
import Me from "../../assets/images/me.jpg";
import SocialMedia from "../atoms/SocialMedia";

const About = () => {
  return (
    <article className="md:px-28 px-10 mt-10 md:mb-0 mb-10 cursor-default max-w-7xl">
      <div className="flex flex-col text-white md:pb-0 p-5 md:p-10">
        <p className="md:text-xl text-md font-extralight md:text-start text-center">
          {about.greeting}
        </p>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center py-5">
          <h1 className="md:text-7xl text-5xl font-extrabold mb-5 text-indigo-600 text-center">
            {about.name}
          </h1>
          <img
            src={Me}
            alt="Personal picture of Sebastian Alvarez"
            className="rounded-full w-36 md:w-48 block md:hidden"
          />
        </div>
        <p className="md:text-xl text-md text-justify font-extralight mb-5">
          {about.text}
        </p>
        <SocialMedia />
      </div>
    </article>
  );
};

export default About;
