import { idioms } from "../data/languages";
import Title from "./Title";

const Languages = () => {
  return (
    <div className="text-center mx-10">
      <Title>Languages</Title>
      <div className="grid bg-[rgba(0,0,0,0.4)] rounded-lg my-4 p-10">
        <div className={`grid grid-cols-${idioms.length} text-white`}>
          {idioms.map((idiom, index) => (
            <div
              className={`grid grid-rows-2 space-y-2 ${
                index === 0 ? "border-r" : ""
              }`}
            >
              <p className="text-3xl">{idiom.name}</p>
              <p className="font-light">{idiom.level}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Languages;
