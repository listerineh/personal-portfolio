import { interests } from "../data/interests";
import Title from "./Title";

const Interests = () => {
  return (
    <>
      <Title>Interests</Title>
      <div className="text-white border-l border-indigo-400 mx-5 pl-5 mt-3 mb-12">
        {interests.map((interest) => (
          <p key={interest}>{interest}</p>
        ))}
      </div>
    </>
  );
};

export default Interests;
