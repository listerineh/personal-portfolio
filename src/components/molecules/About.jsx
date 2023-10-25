import SocialMedia from "../atoms/SocialMedia";

const About = () => {
  return (
    <article className="relative flex flex-col justify-center h-screen px-10 mt-10 md:mb-0 mb-10 cursor-default max-w-[1350px]">
      <div className="flex flex-col text-on-background dark:text-on-background-dark md:pb-0 p-5 md:p-10">
        <p className="md:text-lg text-md font-extralight md:text-start text-center">
          Hi👋🏻, my name is
        </p>
        <h1 className="md:text-7xl text-5xl font-extrabold mb-5 text-primary dark:text-primary-dark md:text-left text-center">
          Sebastian Alvarez
        </h1>
        <p className="md:text-lg text-md text-justify md:text-start font-extralight mb-5">
          I'm a dedicated Fullstack Software Engineer based in Ecuador,
          passionate about creating innovative solutions for Progressive Web and
          Mobile Applications, REST APIs, and Microservices. My recent journey
          has led me into the fascinating world of Artificial Intelligence,
          where I specialize in developing Computer Vision applications and
          integrating Chat GPT for intelligent conversations just for fun.
        </p>
        <SocialMedia />
      </div>
    </article>
  );
};

export default About;
