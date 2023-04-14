import About from "../components/About";
import GoToTopButton from "../components/GoToTopButton";
import SocialMedia from "../components/SocialMedia";

const Home = () => {
  return (
    <main className="flex flex-col">
      <section
        id="home-section"
        className="flex flex-col items-center justify-center h-screen"
      >
        <About />
        <SocialMedia />
      </section>

      <section
        id="info-section"
        className="flex flex-col items-center justify-center h-screen"
      >
        <p>Information section</p>
      </section>

      <section
        id="projects-section"
        className="flex flex-col items-center justify-center h-screen"
      >
        <p>Projects section</p>
      </section>
      <GoToTopButton />
    </main>
  );
};

export default Home;
