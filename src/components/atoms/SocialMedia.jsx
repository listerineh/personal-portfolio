import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socialmedia } from "../../data/socialmedia";

const SocialMedia = () => {
  return (
    <span className="mt-5 md:mt-0 flex md:justify-start justify-center gap-x-2">
      {socialmedia.map((social) => (
        <a href={social.url} target="_blank" key={social.id} name={social.name}>
          <FontAwesomeIcon
            icon={social.name}
            size="2x"
            className="text-secondary-variant md:hover:text-secondary md:hover:scale-110 transition-all"
          />
        </a>
      ))}
    </span>
  );
};

export default SocialMedia;
