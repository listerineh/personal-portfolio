import { idioms } from "../data/languages";
import { TranslateIcon } from "@heroicons/react/outline";
import Title from "./Title";

const Languages = () => {
  return (
    <>
      <Title>Languages</Title>
      <div className="text-white border-l border-indigo-400 mx-5 pl-5 mt-3 mb-12">
        {idioms.map((idiom) => (
          <div className="flex" key={idiom.name}>
            <TranslateIcon className="h-6 w-6" />
            <pre>
              {" "}
              {idiom.name} - {idiom.level}
            </pre>
          </div>
        ))}
      </div>
    </>
  );
};

export default Languages;
