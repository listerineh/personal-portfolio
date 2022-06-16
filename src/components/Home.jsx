import {
  CodeIcon,
  ChipIcon,
  DatabaseIcon,
  TranslateIcon,
} from "@heroicons/react/outline";
import MyImage from "../images/20220414_210120.webp";

const Home = () => {
  return (
    <div className="md:flex relative md:mt-5">
      <div className="md:w-1/4 px-5 py-5 ">
        <img
          src={MyImage}
          alt="Sebastian Alvarez"
          className="bg-indigo-400 p-1 max-w-full h-auto rounded-full transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
        />

        <h1 className="text-2xl text-indigo-600 font-bold uppercase mt-10">
          About me
        </h1>
        <div className="text-sm text-white border-l border-indigo-400 mx-5 pl-5 my-3">
          Hi! My name is Sebastian Alvarez, I'm an ecuadorian software
          engeneering student and developer. I consider myself a person who
          enjoys learning new things, meeting people from different places and
          sharing technical and personal experiences to grow mutually. I love
          technology and enjoy learning about it and I'm also an amateur
          musician so I can play guitar, bass and piano.
        </div>
      </div>

      <div className="md:w-2/4 px-5 py-5">
        <h1 className="text-2xl text-indigo-600 font-bold uppercase">
          Studies
        </h1>
        <div className="text-white border-l border-indigo-400 mx-5 pl-5 mt-3 mb-12 text-justify">
          <div>
            <p className="text-xl">Software Engenieering</p>
            <p>
              <a
                href="https://www.espe.edu.ec/"
                target="_blank"
                className="text-indigo-300"
              >
                Universidad de las Fuerzas Armadas ESPE
              </a>{" "}
            </p>
            <p className="font-extralight">[Oct. 2018 - Present]</p>
            <p className="text-sm font-bold text-indigo-600">Memberships:</p>
            <div className="text-sm font-extralight pl-5">
              <p>- Software Development Club member since 2018.</p>
              <p>- CIS-IEEE ESPE Branch member, 2018-2019.</p>
            </div>
          </div>
        </div>

        <h1 className="text-2xl text-indigo-600 font-bold uppercase">
          Experience
        </h1>
        <div className="text-white border-l border-indigo-400 mx-5 pl-5 mt-3 mb-12">
          <div className="mb-5">
            <p className="text-xl">Student / Developer</p>
            <p>
              <a
                href="https://cicte.espe.edu.ec/"
                target="_blank"
                className="text-indigo-300"
              >
                Military Applications Research Center CICTE
              </a>{" "}
            </p>
            <p className="font-extralight">[Jul. 2020 - Dec. 2020]</p>
            <p className="text-sm font-bold text-indigo-600">Functions:</p>
            <div className="text-sm font-extralight pl-5 text-justify">
              <p>- Development of computer vision algorithms in Matlab.</p>
              <p>- Integration with Arduino and servomotors.</p>
              <p>- Presentation of the project to a jury.</p>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-xl">Development team leader</p>
            <p>
              <a
                href="https://prowessec.com/"
                target="_blank"
                className="text-indigo-300"
              >
                Prowessec
              </a>{" "}
            </p>
            <p className="font-extralight">[Jan. 2022 - Mar. 2022]</p>
            <p className="text-sm font-bold text-indigo-600">Functions:</p>
            <div className="text-sm font-extralight pl-5 text-justify">
              <p>- Management of the e-commerce website with Wordpress.</p>
              <p>
                - Meetings for communicating progress to the administratives of
                the project.
              </p>
              <p>
                - Use plugins like: WooCommerce, Elementor, Dokan, Google
                Analytics, etc.
              </p>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-xl">Information Technology Intern</p>
            <p>
              <a
                href="https://ioet.com/"
                target="_blank"
                className="text-indigo-300"
              >
                ioet
              </a>{" "}
            </p>
            <p className="font-extralight">[Apr. 2022 - Present]</p>
            <p className="text-sm font-bold text-indigo-600">Functions:</p>
            <div className="text-sm font-extralight pl-5 ">
              <p>
                - Maintenance of an internal application using: Python, Docker,
                Azure Platform, Angular, Git.
              </p>
              <p>- Training in Scrum agile development methodology.</p>
              <p>- English training for communications with foreign clients.</p>
              <p>- Management of PostgreSQL and CosmosDB databases.</p>
              <p>
                - Training in DevOps with Terraform, Github actions and CI/CD
                based on an Azure architecture.
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-2xl text-indigo-600 font-bold uppercase">
          Certificates & Learning
        </h1>
        <div className="text-white border-l border-indigo-400 mx-5 pl-5 mt-3 mb-12">
          <div className="mb-5">
            <p>Award of Course Completion "Java Foundations"</p>
            <p className="text-sm">
              <a
                href="https://academy.oracle.com/en/oa-web-overview.html"
                target="_blank"
                className="text-indigo-300"
              >
                Oracle Academy
              </a>{" "}
              <span className="font-extralight">[Issued on Apr 2019].</span>
            </p>
          </div>

          <div className="mb-5">
            <p>Award of Course Completion "Java Programming"</p>
            <p className="text-sm">
              <a
                href="https://academy.oracle.com/en/oa-web-overview.html"
                target="_blank"
                className="text-indigo-300"
              >
                Oracle Academy
              </a>{" "}
              <span className="font-extralight">[Issued on Sep 2019].</span>
            </p>
          </div>

          <div className="mb-5">
            <p>Introduction to computer vision with Python</p>
            <p className="text-sm">
              <a
                href="https://site.ieee.org/sb-epn/"
                target="_blank"
                className="text-indigo-300"
              >
                IEEE-EPN
              </a>{" "}
              |{" "}
              <a
                href="https://www.kpa8.com/"
                target="_blank"
                className="text-indigo-300"
              >
                Kp@8
              </a>{" "}
              |{" "}
              <a
                href="https://www.emis.com/php/company-profile/EC/Inglidex_CiaLtda_es_8197791.html"
                target="_blank"
                className="text-indigo-300"
              >
                INGLIDEX
              </a>{" "}
              <span className="font-extralight">[Issued on Oct 2019].</span>
            </p>
          </div>

          <div className="mb-5">
            <p>
              Learn SCRUM{" "}
              <a
                href="https://www.linkedin.com/learning/certificates/fce085566104ebfac691daa0e74fbdbc87ebe56ef2903bb3cd4614f106a1dedd"
                target="_blank"
                className="text-green-400 text-xs uppercase font-bold"
              >
                Credential
              </a>
            </p>
            <p className="text-sm">
              <a
                href="https://linkedin.com"
                target="_blank"
                className="text-indigo-300"
              >
                LinkedIn
              </a>{" "}
              <span className="font-extralight">[Issued on Feb 2022].</span>
            </p>
          </div>

          <div className="mb-5">
            <p>
              4.0 Industry Course{" "}
              <a
                href="https://www.udemy.com/certificate/UC-0ee5e343-766f-4790-a059-505f3ab3a275/"
                target="_blank"
                className="text-green-400 text-xs uppercase font-bold"
              >
                Credential
              </a>
            </p>
            <p className="text-sm">
              <a
                href="https://udemy.com"
                target="_blank"
                className="text-indigo-300"
              >
                Udemy
              </a>{" "}
              <span className="font-extralight">[Issued on Mar 2022].</span>
            </p>
          </div>

          <div className="mb-5">
            <p>
              Cibersecurity - CompTIA Security{" "}
              <a
                href="https://www.udemy.com/certificate/UC-610201d3-c862-4d46-b313-f93d759a912b/"
                target="_blank"
                className="text-green-400 text-xs uppercase font-bold"
              >
                Credential
              </a>
            </p>
            <p className="text-sm">
              <a
                href="https://udemy.com"
                target="_blank"
                className="text-indigo-300"
              >
                Udemy
              </a>{" "}
              <span className="font-extralight">[Issued on Mar 2022].</span>
            </p>
          </div>
        </div>

        <h1 className="text-2xl text-indigo-600 font-bold uppercase">
          Personal Achivements
        </h1>
        <div className="text-white border-l border-indigo-400 mx-5 pl-5 my-3">
          <div className="mb-5">
            <p className="text-xl">
              Participation in the IEEExtreme 13.0 global competition –
              Sangolqui, Ecuador
            </p>
            <p className="text-sm font-bold text-indigo-600">Description:</p>
            <div className="text-sm font-extralight pl-5 text-justify">
              <p>
                Representation of Universidad de las Fuerzas Armadas ESPE in the
                IEEExtreme 13.0 world programming competition, ranking 912th
                worldwide and 13th in Ecuador.
              </p>
              <p>Date: 19/10/2019 – 20/10/2019</p>
              <p>Duration: 24 hours.</p>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-xl">
              Participation in the Devsu Code-jam 2021 international competition
              – Quito, Ecuador
            </p>
            <p className="text-sm font-bold text-indigo-600">Description:</p>
            <div className="text-sm font-extralight pl-5 text-justify">
              <p>
                Participation in international competition (Peru, Colombia,
                Ecuador) Devsu Code-jam 2021 edition, ranking 45th overall and
                18th in Ecuador.
              </p>
              <p>Date: 4/09/2021</p>
              <p>Duration: 6 hours.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-1/4 px-5 py-5">
        <h1 className="text-2xl text-indigo-600 font-bold uppercase">
          Knowledges
        </h1>
        <div className="text-white border-l border-indigo-400 mx-5 pl-5 mt-3 mb-12">
          <div className="flex">
            <CodeIcon className="h-6 w-6" />
            <pre> C/C++</pre>
          </div>

          <div className="flex">
            <CodeIcon className="h-6 w-6" />
            <pre> Java</pre>
          </div>

          <div className="flex">
            <CodeIcon className="h-6 w-6" />
            <pre> Python</pre>
          </div>

          <div className="flex">
            <CodeIcon className="h-6 w-6" />
            <pre> .NET</pre>
          </div>

          <div className="flex">
            <CodeIcon className="h-6 w-6" />
            <pre> Javascript</pre>
          </div>

          <div className="flex">
            <ChipIcon className="h-6 w-6" />
            <pre> OpenCV</pre>
          </div>

          <div className="flex">
            <ChipIcon className="h-6 w-6" />
            <pre> Tensorflow</pre>
          </div>

          <div className="flex">
            <ChipIcon className="h-6 w-6" />
            <pre> Keras</pre>
          </div>

          <div className="flex">
            <ChipIcon className="h-6 w-6" />
            <pre> Node</pre>
          </div>

          <div className="flex">
            <ChipIcon className="h-6 w-6" />
            <pre> React</pre>
          </div>

          <div className="flex">
            <DatabaseIcon className="h-6 w-6" />
            <pre> MySQL</pre>
          </div>

          <div className="flex">
            <DatabaseIcon className="h-6 w-6" />
            <pre> Oracle</pre>
          </div>

          <div className="flex">
            <DatabaseIcon className="h-6 w-6" />
            <pre> MongoDB</pre>
          </div>

          <div className="flex">
            <DatabaseIcon className="h-6 w-6" />
            <pre> Firebase</pre>
          </div>
        </div>

        <h1 className="text-2xl text-indigo-600 font-bold uppercase">
          Languages
        </h1>
        <div className="text-white border-l border-indigo-400 mx-5 pl-5 mt-3 mb-12">
          <div className="flex">
            <TranslateIcon className="h-6 w-6" />
            <pre> Spanish - Native</pre>
          </div>

          <div className="flex">
            <TranslateIcon className="h-6 w-6" />
            <pre> English - B2</pre>
          </div>
        </div>

        <h1 className="text-2xl text-indigo-600 font-bold uppercase">
          Interests
        </h1>
        <div className="text-white border-l border-indigo-400 mx-5 pl-5 mt-3 mb-12">
          <p>Movil apps development</p>
          <p>Web apps development</p>
          <p>Artificial intelligence</p>
          <p>DevOps & Infrastructure</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
