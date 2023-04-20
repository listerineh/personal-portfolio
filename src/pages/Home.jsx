import About from "../components/molecules/About";
import GoToTopButton from "../components/atoms/GoToTopButton";
import TopWave from "../components/atoms/TopWave";
import BottomWave from "../components/atoms/BottomWave";
import Skills from "../components/molecules/Skills";
import Section from "../layout/Section";
import Title from "../components/atoms/Title";
import Items from "../components/atoms/Items";
import { studies } from "../data/studies";
import { experiences } from "../data/experiences";

const Home = () => {
  return (
    <main className="flex flex-col bg-custom-gray">
      <section
        id="home-section"
        className="flex flex-col items-center justify-center h-screen"
      >
        <About />
      </section>

      <TopWave />

      <Section title="skills" dark={true}>
        <Skills />
      </Section>

      <section className="flex flex-col md:flex-row">
        <aside
          id="education-section"
          className="flex flex-col pt-10 md:pt-5 pl-0 md:pl-20 bg-custom-dark w-full md:w-1/2"
        >
          <Title title="education" />
          <Items list={studies} />
        </aside>

        <aside
          id="experience-section"
          className="flex flex-col pt-10 md:pt-5 pr-0 md:pr-20 bg-custom-dark w-full md:w-1/2"
        >
          <Title title="experience" />
          <Items list={experiences} />
        </aside>
      </section>

      <BottomWave />

      <Section title="projects" dark={false}></Section>

      <Section title="achivements" dark={false}></Section>

      <GoToTopButton />
    </main>
  );
};

export default Home;
