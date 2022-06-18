import Knowledge from "./Knowledge";
import { languages, technologies, databases } from "../data/knowledges";
import { CodeIcon, ChipIcon, DatabaseIcon } from "@heroicons/react/outline";

const Knowledges = () => {
  return (
    <>
      <h1 className="text-2xl text-indigo-600 font-bold uppercase">
        Knowledges
      </h1>
      <div className="text-white border-l border-indigo-400 mx-5 pl-5 mt-3 mb-12">
        <Knowledge knowledges={languages} KIcon={CodeIcon} />
        <Knowledge knowledges={technologies} KIcon={ChipIcon} />
        <Knowledge knowledges={databases} KIcon={DatabaseIcon} />
      </div>
    </>
  );
};

export default Knowledges;
