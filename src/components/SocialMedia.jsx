import { socialmedia } from "../data/socialmedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "./Title";

const SocialMedia = () => {
  return (
    <>
      <Title>Find me on</Title>
      <div className="mt-5 flex gap-x-2 border-l border-indigo-400 mx-5 pl-5">
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
              className="text-white"
            />
          </a>
        ))}
      </div>
    </>
  );
};

export default SocialMedia;
