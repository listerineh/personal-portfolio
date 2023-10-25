import About from "../components/molecules/About";
import Skills from "../components/molecules/Skills";
import Title from "../components/atoms/Title";
import Projects from "../components/organisms/Projects";

const Home = () => {
  return (
    <main className="flex flex-col">
      <section
        id="home-section"
        className="flex flex-col items-center justify-center h-screen pt-5 md:pt-0"
      >
        <About />
      </section>

      <div className="flex flex-col items-center  bg-surface dark:bg-surface-dark w-full">
        <section
          id="skills-section"
          className="flex flex-col pt-10 px-0 md:px-10"
        >
          <Skills />
        </section>
      </div>

      <section
        id="projects-section"
        className="flex flex-col pt-10 px-0 md:px-20"
      >
        <Title title="projects" />
        <Projects />
      </section>
    </main>
  );
};

export default Home;
