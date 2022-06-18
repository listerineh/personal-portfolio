import { socialmedia } from "../data/socialmedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialMedia = () => {
  return (
    <>
      <h1 className="text-2xl text-indigo-600 font-bold uppercase mt-10">
        Find me on
      </h1>
      <div className="mt-5 flex gap-x-2">
        {socialmedia.map((social) => (
          <a
            href={social.url}
            target="_blank"
            key={social.id}
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
