import Experience from "../components/Experience";
import Knowledges from "../components/Knowledges";
import Studies from "../components/Studies";
import Certificates from "../components/Certificates";
import Achivements from "../components/Achivements";
import Languages from "../components/Languages";
import Interests from "../components/Interests";

const Info = () => {
  return (
    <div className="md:flex relative md:mt-5 lg:ml-8">
      <div className="md:w-3/4 px-5 py-5">
        <Studies />
        <Experience />
        <Certificates />
        <Achivements />
      </div>

      <div className="md:w-1/4 px-5 py-5">
        <Knowledges />
        <Languages />
        <Interests />
      </div>
    </div>
  );
};

export default Info;