import Chat1 from "../assets/images/ChatApp1.webp";
import Chat2 from "../assets/images/ChatApp2.webp";
import Chat3 from "../assets/images/ChatApp3.webp";
import Chat4 from "../assets/images/ChatApp4.webp";
import Chat5 from "../assets/images/ChatApp5.webp";
import Vet1 from "../assets/images/petvet1.webp";
import Vet2 from "../assets/images/petvet2.webp";
import Vet3 from "../assets/images/petvet3.webp";
import Vet4 from "../assets/images/petvet4.webp";
import Vet5 from "../assets/images/petvet5.webp";
import Crypto from "../assets/images/quote-cryptos.webp";
import SLLP1 from "../assets/images/1-sign-language.webp";
import SLLP2 from "../assets/images/2-sign-language.webp";
import SLLP3 from "../assets/images/menu-sign-language.webp";
import Hands1 from "../assets/images/Hands1.webp";
import Hands2 from "../assets/images/Hands2.webp";
import Hands3 from "../assets/images/Hands3.webp";
import EDLL1 from "../assets/images/EDLL1.webp";
import EDLL2 from "../assets/images/EDLL2.webp";
import EDLL3 from "../assets/images/EDLL3.webp";
import EDLL4 from "../assets/images/EDLL4.webp";
import EDLL5 from "../assets/images/EDLL5.webp";
import EDLL6 from "../assets/images/EDLL6.webp";
import EDLL7 from "../assets/images/EDLL7.webp";
import EDLL8 from "../assets/images/EDLL8.webp";
import Budget from "../assets/images/budget-planner.webp";
import Admin from "../assets/images/clients-admin.webp";
import Hanged1 from "../assets/images/Hanged1.webp";
import Hanged2 from "../assets/images/Hanged2.webp";
import Hanged3 from "../assets/images/Hanged3.webp";
import Hanged4 from "../assets/images/Hanged4.webp";
import Hanged6 from "../assets/images/Hanged6.webp";
import Hanged7 from "../assets/images/Hanged7.webp";
import Hanged8 from "../assets/images/Hanged8.webp";

export const projects = [
  {
    title: "Sockets ChatApp",
    photo: [Chat5, Chat1, Chat2, Chat3, Chat4],
    id: "1",
    description:
      "Fullstack chat application using socket.io with node in the backend and react in the frontend with a beautiful dark mode.",
    stack: [
      "react",
      "tailwindcss",
      "postcss",
      "nodejs",
      "socket-io",
      "express",
    ],
    repo: "https://github.com/listerineh/react-socket-express-chatapp",
    icon: "PWA",
  },
  {
    title: "Veterinary Administrator",
    photo: [Vet1, Vet2, Vet3, Vet4, Vet5],
    id: "2",
    description:
      "Responsive web application to manage a veterinary clinic using CRUD operations and saving the data in Local Storage with a beauty dark mode.",
    stack: ["vite", "reactjs", "tailwindcss", "vercel"],
    demo: "https://petvet-admin.vercel.app/",
    repo: "https://github.com/listerineh/veterinary-administrator",
    icon: "PWA",
  },
  {
    title: "SLLP alpha",
    photo: [SLLP1, SLLP2, SLLP3],
    id: "3",
    description:
      "Desktop platform for learning sign language through interactive training within the computer, this alpha version has all the alphabet and a way to test what have you been learned.",
    stack: ["python", "pyqt5", "tensorflow", "keras", "opencv"],
    repo: "https://github.com/listerineh/alphabet-sign-languaje-recognition",
    icon: "Desktop",
  },
  {
    title: "OpenCV Hands Tracking",
    photo: [Hands3, Hands1, Hands2],
    id: "4",
    description:
      "Mediapipe integration with OpenCV using Python to enhanse the hands tracking algorithm and write a square around the hand using hand nodes and math operations.",
    stack: ["python", "opencv", "mediapipe"],
    repo: "https://github.com/listerineh/hands-tracking-opencv-mediapipe",
    icon: "Desktop",
  },
  {
    title: "Escape de la Ley",
    photo: [EDLL8, EDLL1, EDLL2, EDLL3, EDLL4, EDLL5, EDLL6, EDLL7],
    id: "5",
    description:
      "Pacman based game named Escape de la Ley made in C using winbgim graphic library, music, user interaction and gameplay.",
    stack: ["c", "winbgim", "conio"],
    repo: "https://github.com/listerineh/pacman-based-game-EDLL",
    icon: "Desktop",
  },
  {
    title: "Quote Cryptocurrencies",
    photo: [Crypto],
    id: "6",
    description:
      "Responsive web application to quote currencies instantly with the TOP 12 cryptocurrencies of the moment.",
    stack: ["vite", "react", "google-fonts", "styled-components", "netlify"],
    demo: "https://quote-cryptos.netlify.app",
    repo: "https://github.com/listerineh/quote-cryptocurrencies",
    icon: "PWA",
  },
  {
    title: "Budget Plannifier",
    photo: [Budget],
    id: "7",
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
    id: "8",
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
  {
    title: "Console hanged game",
    photo: [Hanged1, Hanged2, Hanged3, Hanged4, Hanged6, Hanged7, Hanged8],
    id: "9",
    description:
      "Console Hanged game within sockets based on client-server architecture using python with Spanish sayings.",
    stack: ["python", "socket", "threading"],
    repo: "https://github.com/listerineh/hanged-game-w-sockets-n-threading",
    icon: "Desktop",
  },
];
