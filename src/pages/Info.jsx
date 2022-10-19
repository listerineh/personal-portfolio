import DataCarousel from "../components/DataCarousel";
import Knowledges from "../components/Knowledges";
import Languages from "../components/Languages";

import { studies } from "../data/studies";
import { experiences } from "../data/experiences";
import { certificates } from "../data/certificates";
import { achivements } from "../data/achivements";

const Info = () => {
  return (
    <div className="md:flex md:min-h-[calc(100vh-16vh)] relative md:mt-5 lg:ml-8">
      <div className="md:w-5/6 md:px-5 md:pt-0 pt-5 pb-5 md:h-[calc(100vh-16vh)] md:overflow-y-scroll scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
        <DataCarousel data={studies} title="Studies" colsNumber={2} />
        <DataCarousel data={experiences} title="Experience" colsNumber={2} />
        <DataCarousel
          data={certificates}
          title="Certificates & Learning"
          colsNumber={1}
        />
        <DataCarousel
          data={achivements}
          title="Personal Achivements"
          colsNumber={1}
        />
        <Languages />
      </div>
      <div className="md:w-1/6 px-5 md:pt-5 md:pb-0 pb-10 md:h-[calc(100vh-20vh)]">
        <Knowledges />
      </div>
    </div>
  );
};

export default Info;
