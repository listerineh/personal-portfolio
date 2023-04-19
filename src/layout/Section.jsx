import Title from "../components/atoms/Title";

const Section = ({ children, title, dark }) => {
  return (
    <section
      id={`${title}-section`}
      className={`flex flex-col pt-10 md:pt-5 px-0 md:px-20 ${
        dark && "bg-custom-dark"
      }`}
    >
      <Title title={title} />
      {children}
    </section>
  );
};

export default Section;
