import { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;
  const RECEIVE_TEMPLATE_KEY = import.meta.env.VITE_RECEIVE_TEMPLATE_KEY;
  const SEND_TEMPLATE_KEY = import.meta.env.VITE_SEND_TEMPLATE_KEY;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      SERVICE_KEY,
      RECEIVE_TEMPLATE_KEY,
      { name: name, email: email, message: message },
      PUBLIC_KEY
    );

    emailjs.send(
      SERVICE_KEY,
      SEND_TEMPLATE_KEY,
      { name: name, email: email },
      PUBLIC_KEY
    );

    setName("");
    setEmail("");
    setMessage("");

    alert("Thanks for submitting your message!\nI'll contact you soon!");
  };

  return (
    <section className="md:basis-1/2 p-10">
      <h3 className="text-2xl mb-5">Contact me!</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name">Fullname</label>
          <input
            id="name"
            type="text"
            placeholder="eg. Joe Doe"
            className="w-full p-2 mt-2 placeholder-gray-400 bg-transparent border-b focus:border-indigo-600 focus:bg-transparent outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="eg. joe.doe@example.com"
            className="w-full p-2 mt-2 placeholder-gray-400 bg-transparent border-b focus:border-indigo-600 focus:bg-transparent outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows="3"
            className="w-full p-2 mt-2 placeholder-gray-400 bg-transparent border-b focus:border-indigo-600 focus:bg-transparent outline-none"
            placeholder="eg. Hi! Work with me, please!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-800 md:bg-transparent border-2 border-indigo-900 w-full p-3 text-white font-bold uppercase hover:bg-indigo-900 cursor-pointer transition-all"
          value="Send"
        />
      </form>
    </section>
  );
};

export default ContactForm;
