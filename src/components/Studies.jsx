import { studies } from "../data/studies";

const Studies = () => {
  return (
    <>
      <h1 className="text-2xl text-indigo-600 font-bold uppercase">Studies</h1>
      {studies.map((studies) => (
        <div className="text-white border-l border-indigo-400 mx-5 pl-5 mt-3 mb-12" key={studies.title}>
          <div>
            <p className="text-xl">{studies.title}</p>
            <p>
              <a href={studies.url} target="_blank" className="text-indigo-300">
                {studies.location}
              </a>
            </p>
            <p className="font-extralight">[{studies.timerange}]</p>
            <p className="text-sm font-bold text-indigo-600">Memberships:</p>
            <div className="text-sm font-extralight pl-5">
              {studies.memberships.map((member) => (
                <p key={member.body}>- {member.body}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Studies;
