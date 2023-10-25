import About from "../components/molecules/About";
import Skills from "../components/molecules/Skills";
import Title from "../components/atoms/Title";
import Projects from "../components/organisms/Projects";

const Home = () => {
  return (
    <main className="flex flex-col w-full">
      <section
        id="home-section"
        className="flex flex-col items-center justify-center h-screen w-full pt-5 md:pt-0"
      >
        <About />
      </section>

      <section
        id="skills-section"
        className="flex flex-col pt-10 px-0 md:px-10 bg-surface dark:bg-surface-dark w-full"
      >
        <Skills />
      </section>

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
