import About from "../components/About";
import SocialMedia from "../components/SocialMedia";

const Home = () => {
  return (
    <div className="grid p-5 content-center h-[calc(100vh-16vh)]">
      <div className="grid content-center">
        <About />
        <SocialMedia />
      </div>
    </div>
  );
};

export default Home;
