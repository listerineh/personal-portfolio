import { socialmedia } from "../data/socialmedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialMedia = () => {
  return (
    <span className="mt-5 flex justify-center gap-x-2 mx-5">
      {socialmedia.map((social) => (
        <a href={social.url} target="_blank" key={social.id} name={social.name}>
          <FontAwesomeIcon
            icon={social.name}
            size="2x"
            className="text-white md:text-gray-700 hover:text-white hover:scale-110 transition-all"
          />
        </a>
      ))}
    </span>
  );
};

export default SocialMedia;
