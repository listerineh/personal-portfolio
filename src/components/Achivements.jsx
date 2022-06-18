import { achivements } from "../data/achivements";

const Achivements = () => {
  return (
    <>
      <h1 className="text-2xl text-indigo-600 font-bold uppercase">
        Personal Achivements
      </h1>
      <div className="text-white border-l border-indigo-400 mx-5 pl-5 my-3">
        {achivements.map((achivement) => (
          <div className="mb-5" key={achivement.title}>
            <p className="text-xl">{achivement.title}</p>
            <p className="text-sm font-bold text-indigo-600">Description:</p>
            <div className="text-sm font-extralight pl-5 text-justify">
              <p>{achivement.description}</p>
              <p>Date: {achivement.date}</p>
              <p>Duration: {achivement.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Achivements;
