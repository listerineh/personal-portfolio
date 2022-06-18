import { certificates } from "../data/certificates";
import { PaperClipIcon } from "@heroicons/react/outline";

const Certificates = () => {
  return (
    <>
      <h1 className="text-2xl text-indigo-600 font-bold uppercase">
        Certificates & Learning
      </h1>
      <div className="text-white border-l border-indigo-400 mx-5 pl-5 mt-3 mb-12">
        {certificates.map((certificate) => (
          <div className="mb-5" key={certificate.title}>
            <p className="flex">
              {certificate.title}
              {certificate.credential && (
                <a
                  href={certificate.credential}
                  target="_blank"
                  className="text-green-400 text-xs uppercase font-bold"
                >
                  <PaperClipIcon className="h-6 w-6" />
                </a>
              )}
            </p>
            <p className="text-sm">
              {certificate.giver.map((giver) => (
                <a href={giver.url} target="_blank" className="text-indigo-300" key={giver.company} >
                  {giver.company}{" "}
                </a>
              ))}
              <span className="font-extralight">
                [{certificate.issuedtime}].
              </span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Certificates;
