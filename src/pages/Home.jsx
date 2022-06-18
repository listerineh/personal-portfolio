import Experience from "../components/Experience";
import Knowledges from "../components/Knowledges";
import Studies from "../components/Studies";
import Certificates from "../components/Certificates";
import Achivements from "../components/Achivements";
import Languages from "../components/Languages";
import About from "../components/About";
import Interests from "../components/Interests";
import SocialMedia from "../components/SocialMedia";

const Home = () => {
  return (
    <div className="md:flex relative md:mt-5">
      <div className="md:w-1/4 px-5 py-5 ">
        <About />
        <SocialMedia />
      </div>

      <div className="md:w-2/4 px-5 py-5">
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

export default Home;
