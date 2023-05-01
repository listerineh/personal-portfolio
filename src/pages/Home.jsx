import About from "../components/atoms/About";
import Skills from "../components/molecules/Skills";
import Title from "../components/atoms/Title";
import Projects from "../components/organisms/Projects";
import Items from "../components/atoms/Items";
import { studies } from "../data/studies";
import { experiences } from "../data/experiences";

const Home = () => {
  return (
    <main className="flex flex-col">
      <section
        id="home-section"
        className="flex flex-col items-center justify-center h-screen"
      >
        <About />
      </section>

      <div className="flex flex-col items-center  bg-surface dark:bg-surface-dark w-full">
        <div className="max-w-7xl">
          <section
            id="skills-section"
            className="flex flex-col pt-10 px-0 md:px-10"
          >
            <Skills />
          </section>

          <section className="flex flex-col md:flex-row">
            <aside
              id="education-section"
              className="flex flex-col pt-10 md:pt-5 pl-0 md:pl-20 w-full md:w-1/2"
            >
              <Title title="education" />
              <Items list={studies} />
            </aside>

            <aside
              id="experience-section"
              className="flex flex-col pt-10 md:pt-5 pr-0 md:pr-20 w-full md:w-1/2"
            >
              <Title title="experience" />
              <Items list={experiences} />
            </aside>
          </section>
        </div>
      </div>

      <section
        id="projects-section"
        className="flex flex-col pt-10 px-0 md:px-20"
      >
        <Title title="projects" />
        <Projects />
      </section>

      <section
        id="achivements-section"
        className="flex flex-col pt-10 px-0 md:px-20"
      >
        <Title title="achivements" />
      </section>
    </main>
  );
};

export default Home;
