import VeterinaryPhoto from "../images/veterinary-admin.webp";
import BudgetPhoto from "../images/budget-planner.webp";
import ClientsPhoto from "../images/clients-admin.webp";
import CryptosPhoto from "../images/quote-cryptos.webp";

export const projects = [
  {
    title: "Veterinary Administrator",
    photo: VeterinaryPhoto,
    url: "1",
    description:
      "Simple responsive web application to manage a veterinary using CRUD operations and saving the data in Local Storage (Browser).",
  },
  {
    title: "Budget Plannifier",
    photo: BudgetPhoto,
    url: "2",
    description:
      "Simple responsive web application to plan your budget adding, editing and deleting expenses with a graphic and dinamic view.",
  },
  {
    title: "Clients Administrator",
    photo: ClientsPhoto,
    url: "3",
    description:
      "Simple responsive web application to manage your clients using CRUD operations and saving the data in a json server splitted in development and production mode.",
  },
  {
    title: "Quote Cryptocurrencies",
    photo: CryptosPhoto,
    url: "4",
    description:
      "Simple responsive web application to quote currencies instantly with the TOP 12 cryptocurrencies of the moment.",
  },
];
