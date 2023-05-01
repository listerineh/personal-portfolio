import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import Error404 from "./pages/Error404";
import Portfolio from "./pages/Portfolio";
import Project from "./pages/Project";

const App = () => {
  const [theme, setTheme] = useState();

  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = dark ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={
            <Layout handleThemeSwitch={handleThemeSwitch} theme={theme} />
          }
        >
          <Route index element={<Home />} />
          <Route path="/projects" element={<Portfolio />} />
          <Route path="/projects/:id" element={<Project />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
