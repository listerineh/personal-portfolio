import React from "react";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";

const Footer = () => {
  return (
    <footer className="flex flex-col w-full text-on-background dark:text-on-background-dark cursor-default">
      <section
        id="contacs-section"
        className="flex flex-col-reverse md:flex-row md:flex-wrap bg-surface dark:bg-surface-dark rounded-t-md"
      >
        <ContactForm />
        <ContactInformation />
      </section>

      <section className="bg-primary-variant dark:bg-background-dark p-5 text-center text-sm">
        <p className="font-light text-on-primary dark:text-on-background-dark">
          &copy; 2023 | Designed by{" "}
          <span className="font-bold">Sebastian Alvarez</span>.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
