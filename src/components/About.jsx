import { about } from "../data/information";

const About = () => {
  return (
    <div className="text-white md:px-32 px-10 my-3 mb-10">
      <h2 className="md:text-7xl text-5xl font-mono border-b border-indigo-600 pb-2 md:mb-7 mb-5 cursor-default">
        {about.greeting}
      </h2>
      <p className="md:text-xl text-md text-justify font-extralight cursor-default">
        {about.text}
      </p>
    </div>
  );
};

export default About;
