import React from "react";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";

const Footer = () => {
  return (
    <footer className="flex flex-col w-full text-white cursor-default">
      <section
        id="contacs-section"
        className="flex flex-col-reverse md:flex-row md:flex-wrap bg-custom-gray"
      >
        <ContactForm />
        <ContactInformation />
      </section>

      <section className="bg-black p-5 text-center text-sm">
        <p className="font-light">
          &copy; 2023 | Designed by{" "}
          <span className="font-bold">Sebastian Alvarez</span>.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
