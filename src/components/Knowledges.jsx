import { technologies } from "../data/knowledges";
import Title from "./Title";

const Knowledges = () => {
  return (
    <div className="md:h-[calc(100vh-30vh)] mr-5 md:ml-0 ml-5 grid gap-y-5 justify-items-center content-center">
      <Title>Skills</Title>
      <div className="grid md:grid-cols-3 grid-cols-7 gap-4 text-white">
        {technologies.map((tech) => (
          <div key={tech.name} className="w-11 h-11">
            <img
              src={tech.img}
              alt={tech.name}
              className="w-10 md:grayscale md:hover:grayscale-0 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Knowledges;
