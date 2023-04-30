import Vet1 from "../assets/images/petvet1.webp";
import Vet2 from "../assets/images/petvet2.webp";
import Vet3 from "../assets/images/petvet3.webp";
import Vet4 from "../assets/images/petvet4.webp";
import Vet5 from "../assets/images/petvet5.webp";
import Crypto from "../assets/images/quote-cryptos.webp";
import SLLP1 from "../assets/images/1-sign-language.webp";
import SLLP2 from "../assets/images/2-sign-language.webp";
import SLLP3 from "../assets/images/menu-sign-language.webp";
import Budget from "../assets/images/budget-planner.webp";
import Admin from "../assets/images/clients-admin.webp";

export const projects = [
  {
    title: "Veterinary Administrator",
    photo: [Vet1, Vet2, Vet3, Vet4, Vet5],
    id: "1",
    description:
      "Responsive web application to manage a veterinary clinic using CRUD operations and saving the data in Local Storage with a beauty dark mode.",
    stack: ["vite", "reactjs", "tailwindcss", "vercel"],
    demo: "https://petvet-admin.vercel.app/",
    repo: "https://github.com/listerineh/veterinary-administrator",
    icon: "PWA",
  },
  {
    title: "Quote Cryptocurrencies",
    photo: [Crypto],
    id: "2",
    description:
      "Responsive web application to quote currencies instantly with the TOP 12 cryptocurrencies of the moment.",
    stack: ["vite", "react", "google-fonts", "styled-components", "netlify"],
    demo: "https://quote-cryptos.netlify.app",
    repo: "https://github.com/listerineh/quote-cryptocurrencies",
    icon: "PWA",
  },
  {
    title: "SLLP alpha",
    photo: [SLLP1, SLLP2, SLLP3],
    id: "3",
    description:
      "Platform for learning sign language through interactive training within the computer, this alpha version has all the alphabet and a way to test what have you been learned.",
    stack: ["python", "pyqt5", "tensorflow", "keras", "opencv"],
    repo: "https://github.com/listerineh/alphabet-sign-languaje-recognition",
    icon: "Desktop",
  },
  {
    title: "Budget Plannifier",
    photo: [Budget],
    id: "4",
    description:
      "Responsive web application to plan your budget adding, editing and deleting expenses within a graphic and dinamic view.",
    stack: [
      "vite",
      "react",
      "normalizecss",
      "netlify",
      "react-circular-progressbar",
      "react-swipeable-list",
    ],
    demo: "https://budget-plannifier.netlify.app",
    repo: "https://github.com/listerineh/budget-planner",
    icon: "PWA",
  },
  {
    title: "Clients Administrator",
    photo: [Admin],
    id: "5",
    description:
      "Responsive web application to manage your clients using CRUD operations and saving the data in a json server splitted in development and production mode.",
    stack: [
      "vite",
      "react",
      "formik",
      "yup",
      "json-server",
      "tailwindcss",
      "netlify",
    ],
    demo: "https://simple-crn.netlify.app/",
    repo: "https://github.com/listerineh/simple-CRN",
    icon: "PWA",
  },
];
