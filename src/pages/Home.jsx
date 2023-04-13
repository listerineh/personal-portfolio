import About from "../components/About";
import GoToTopButton from "../components/GoToTopButton";
import SocialMedia from "../components/SocialMedia";

const Home = () => {
  return (
    <main className="flex flex-col">
      <section className="flex flex-col items-center justify-center h-screen">
        <About />
        <SocialMedia />
      </section>
      <GoToTopButton />
    </main>
  );
};

export default Home;
