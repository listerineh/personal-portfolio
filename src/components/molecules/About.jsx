import { about } from "../../data/information";
import Me from "../../assets/images/me.jpg";
import SocialMedia from "../atoms/SocialMedia";

const About = () => {
  return (
    <article className="md:px-28 px-10 mt-20 md:mt-10 md:mb-0 mb-10 cursor-default max-w-7xl">
      <div className="flex flex-col md:flex-row justify-center items-center text-white pb-5 md:pb-0">
        <aside className="w-full md:w-2/3 p-5 md:p-10">
          <p className="md:text-xl text-md font-extralight ">
            {about.greeting}
          </p>
          <h1 className="md:text-7xl text-5xl font-extrabold mb-5 text-indigo-600 w-2">
            {about.name}
          </h1>
          <p className="md:text-xl text-md text-justify font-extralight">
            {about.text}
          </p>
        </aside>
        <aside className="w-full md:w-1/3 flex flex-col justify-center items-center">
          <img
            src={Me}
            alt="Personal picture of Sebastian Alvarez"
            className="rounded-full border-2 border-indigo-600 max-w-xs"
          />
        </aside>
      </div>
      <SocialMedia />
    </article>
  );
};

export default About;
