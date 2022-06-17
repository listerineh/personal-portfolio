import { interests } from "../data/interests"

const Interests = () => {
  return (
    <>
      <h1 className="text-2xl text-indigo-600 font-bold uppercase">
        Interests
      </h1>
      <div className="text-white border-l border-indigo-400 mx-5 pl-5 mt-3 mb-12">
        {interests.map((interest) => (
            <p key={interest}>{interest}</p>
        ))}
      </div>
    </>
  );
};

export default Interests;
