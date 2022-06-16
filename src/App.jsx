import { BrowserRouter, Routes, Route } from "react-router-dom";

import Contacts from "./pages/Contacts";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Project from "./pages/Project";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path=":id" element={<Project />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
