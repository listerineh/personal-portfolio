import { about } from "../data/information";
import MyImage from "../images/main-photo.webp";
import Title from "./Title";

const About = () => {
  return (
    <>
      <img
        src={MyImage}
        alt="Sebastian Alvarez"
        className="bg-slate-50 mb-10 p-1 w-full h-auto rounded-full transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
      />
      <Title>About me</Title>
      <div className="text-sm text-white border-l border-indigo-400 mx-5 pl-5 my-3 mb-10">
        {about.text}
      </div>
    </>
  );
};

export default About;
