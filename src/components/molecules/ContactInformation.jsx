import React from "react";
import { socialmedia } from "../../data/socialmedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactInformation = () => {
  return (
    <section className="md:basis-1/2 p-10 md:bg-black md:rounded-tr-2xl">
      <h3 className="text-2xl mb-10">Contact information</h3>
      <div className="flex flex-col gap-y-5 md:px-10">
        {socialmedia.map((social) => (
          <a
            href={social.url}
            target="_blank"
            key={social.id}
            name={social.name}
            className="flex gap-x-5 items-center text-white md:text-gray-700 hover:text-white md:hover:scale-110 transition-all"
          >
            <FontAwesomeIcon icon={social.name} size="2x" />
            <p>{social.social}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ContactInformation;
