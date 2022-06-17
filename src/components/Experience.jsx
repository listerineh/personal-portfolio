import { experiences } from "../data/experiences";

const Experience = () => {
  return (
    <>
      <h1 className="text-2xl text-indigo-600 font-bold uppercase">
        Experience
      </h1>
      <div className="text-white border-l border-indigo-400 mx-5 pl-5 mt-3 mb-12">
        {experiences.map((experience) => (
          <div className="mb-5" key={experience.title}>
            <p className="text-xl">{experience.title}</p>
            <p>
              <a
                href={experience.url}
                target="_blank"
                className="text-indigo-300"
              >
                {experience.location}
              </a>
            </p>
            <p className="font-extralight">[{experience.timerange}]</p>
            <p className="text-sm font-bold text-indigo-600">Functions:</p>
            <div className="text-sm font-extralight pl-5">
              {experience.functions.map((func) => (
                <p key={func.body}>- {func.body}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Experience;
