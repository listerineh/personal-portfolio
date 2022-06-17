import { useState } from "react";
import emailjs from "emailjs-com";
import Error from "../components/Error";

const Contacts = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([name, lastname, email, message].includes("")) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    emailjs
      .send(
        "service_dufc4dd",
        "template_s8r5rwq",
        { name: name, email: email, lastname: lastname, message: message },
        "0QC6Oj8JwOIS-5TzY"
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    setName("");
    setLastname("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="md:flex relative">
      <div className="md:w-1/4 lg:w-1/5"></div>
      <div className="md:w-2/4 lg:w-3/5 mx-5">
        <h1 className="font-black text-4xl text-center text-indigo-600 uppercase my-5">
          Contact me
        </h1>

        <form
          className="bg-black shadow-md rounded-md py-5 px-5 mb-10"
          onSubmit={handleSubmit}
        >
          {error && <Error msg="Please fill all the fields!" />}

          <div className="md:flex">
            <div className="mb-5 md:w-1/2 md:mr-5">
              <label
                htmlFor="name"
                className="block text-indigo-600 uppercase font-bold"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-5 md:w-1/2">
              <label
                htmlFor="lastname"
                className="block text-indigo-600 uppercase font-bold"
              >
                Lastname
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Enter your lastname"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-indigo-600 uppercase font-bold"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="message"
              className="block text-indigo-600 uppercase font-bold"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="3"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Describe the symptoms"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all rounded-lg"
            value="Send"
          />
        </form>
      </div>
    </div>
  );
};

export default Contacts;
