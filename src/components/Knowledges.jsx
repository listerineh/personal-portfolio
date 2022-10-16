import Knowledge from "./Knowledge";
import { languages, technologies, databases } from "../data/knowledges";
import { CodeIcon, ChipIcon, DatabaseIcon } from "@heroicons/react/outline";
import Title from "./Title";

const Knowledges = () => {
  return (
    <>
      <Title>Knowledges</Title>
      <div className="text-white border-l border-indigo-400 mx-5 pl-5 mt-3 mb-12">
        <Knowledge knowledges={languages} KIcon={CodeIcon} />
        <Knowledge knowledges={technologies} KIcon={ChipIcon} />
        <Knowledge knowledges={databases} KIcon={DatabaseIcon} />
      </div>
    </>
  );
};

export default Knowledges;
