import VeterinaryPhoto from "../images/veterinary-admin.webp";
import BudgetPhoto from "../images/budget-planner.webp";
import ClientsPhoto from "../images/clients-admin.webp";
import CryptosPhoto from "../images/quote-cryptos.webp";
import SignLanguageMenu from "../images/menu-sign-language.webp";
import SignLanguage1 from "../images/1-sign-language.webp";
import SignLanguage2 from "../images/2-sign-language.webp";

export const projects = [
  {
    title: "Veterinary Administrator",
    photo: [VeterinaryPhoto],
    url: "1",
    description:
      "Simple responsive web application to manage a veterinary using CRUD operations and saving the data in Local Storage (Browser).",
    stack: [
      "vite", 
      "reactjs", 
      "react-hooks", 
      "react-components", 
      "tailwindcss"
    ],
    demo: "https://veterinary-administrator.netlify.app/",
    repo: "https://github.com/listerineh/veterinary-administrator",
  },
  {
    title: "Budget Plannifier",
    photo: [BudgetPhoto],
    url: "2",
    description:
      "Simple responsive web application to plan your budget adding, editing and deleting expenses with a graphic and dinamic view.",
    stack: [
      "vite",
      "react",
      "react-hooks",
      "react-components",
      "react-circular-progressbar",
      "react-swipeable-list",
      "normalizecss",
      "google-fonts",
    ],
    demo: "https://budget-plannifier.netlify.app",
    repo: "https://github.com/listerineh/budget-planner",
  },
  {
    title: "Clients Administrator",
    photo: [ClientsPhoto],
    url: "3",
    description:
      "Simple responsive web application to manage your clients using CRUD operations and saving the data in a json server splitted in development and production mode.",
    stack: [
      "vite",
      "react",
      "react-hooks",
      "react-components",
      "react-router-dom",
      "json-server",
      "formik",
      "yup",
      "tailwindcss",
    ],
    demo: "https://simple-crn.netlify.app/",
    repo: "https://github.com/listerineh/simple-CRN",
  },
  {
    title: "Quote Cryptocurrencies",
    photo: [CryptosPhoto],
    url: "4",
    description:
      "Simple responsive web application to quote currencies instantly with the TOP 12 cryptocurrencies of the moment.",
      stack: [
        "vite",
        "react",
        "react-hooks",
        "react-custom-hooks",
        "react-components",
        "styled-components",
        "google-fonts",
      ],
    demo: "https://quote-cryptos.netlify.app",
    repo: "https://github.com/listerineh/quote-cryptocurrencies",
  },
  {
    title: "Sign Language Learning Platform BETA",
    photo: [SignLanguageMenu, SignLanguage1, SignLanguage2],
    url: "5",
    description:
      "Platform for learning sign language through interactive training through the computer, the BETA version has a way to test what has been learned.",
      stack: [
        "python",
        "pyqt5",
        "tensorflow",
        "keras",
        "opencv",
      ],
    repo: "https://github.com/listerineh/alphabet-sign-languaje-recognition",
  },
];
