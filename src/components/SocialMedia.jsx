import { socialmedia } from "../data/socialmedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "./Title";

const SocialMedia = () => {
  return (
    <>
      <div className="mt-5 flex justify-center gap-x-2 mx-5">
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
              className="text-white hover:text-indigo-600 transition-all"
            />
          </a>
        ))}
      </div>
    </>
  );
};

export default SocialMedia;
