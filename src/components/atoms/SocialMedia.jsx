import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socialmedia } from "../../data/socialmedia";

const SocialMedia = () => {
  return (
    <div className="mt-5 md:mt-0 flex md:justify-start justify-center items-center md:flex-row flex-col gap-3 z-10">
      <div className="flex gap-x-2">
        {socialmedia.map((social) => (
          <a
            href={social.url}
            target="_blank"
            key={social.id}
            name={social.name}
          >
            <FontAwesomeIcon
              icon={social.name}
              size="2x"
              className="text-secondary-dark hover:text-secondary dark:text-secondary-variant md:dark:hover:text-secondary md:hover:scale-110 transition-all"
            />
          </a>
        ))}
      </div>
      <a
        href="/SebastianAlvarezResume.pdf"
        target="_blank"
        className="bg-secondary-dark hover:bg-secondary dark:bg-secondary-variant md:dark:hover:bg-secondary dark:text-on-secondary text-on-primary dark:text-on-secondary-variant px-3 py-2 rounded-md text-sm font-medium cursor-pointer md:hover:scale-105 transition-all"
      >
        Download my Resume
      </a>
    </div>
  );
};

export default SocialMedia;
