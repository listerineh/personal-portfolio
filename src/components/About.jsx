import { about } from "../data/information";
import MyImage from "../images/main-photo.webp";

const About = () => {
  return (
    <>
      <img
        src={MyImage}
        alt="Sebastian Alvarez"
        className="bg-indigo-500 p-1 w-full rounded-full transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
      />
      <h1 className="text-2xl text-indigo-600 font-bold uppercase mt-10">
        About me
      </h1>
      <div className="text-sm text-white border-l border-indigo-400 mx-5 pl-5 my-3">
        {about.text}
      </div>
    </>
  );
};

export default About;
