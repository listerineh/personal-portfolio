import { socialmedia } from "../../data/socialmedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialMedia = () => {
  return (
    <span className="mt-5 md:mt-0 flex md:justify-start justify-center gap-x-2">
      {socialmedia.map((social) => (
        <a href={social.url} target="_blank" key={social.id} name={social.name}>
          <FontAwesomeIcon
            icon={social.name}
            size="2x"
            className="text-white md:text-gray-400 hover:text-white md:hover:scale-110 transition-all"
          />
        </a>
      ))}
    </span>
  );
};

export default SocialMedia;
