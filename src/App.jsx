import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./components/ContactForm";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Project from "./pages/Project";
import Layout from "./layout/Layout";
import Error404 from "./pages/Error404";
import Info from "./pages/Info";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="info" element={<Info />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:id" element={<Project />} />
          <Route path="contacts" element={<Contacts />} /> */}
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
