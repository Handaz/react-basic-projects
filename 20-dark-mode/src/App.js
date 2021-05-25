import React, { useState, useEffect } from "react";
import data from "./data";
import Article from "./Article";

const getStorageTheme = () => {
  let theme = "light-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

function App() {
  const [theme, setTheme] = useState(getStorageTheme());

  const changeTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.setAttribute("class", localStorage.getItem("theme"));
  }, [theme]);

  return (
    <main>
      <nav className="nav-center">
        <h1>Overreacted</h1>
        <button className="btn" onClick={changeTheme}>
          Toggle
        </button>
      </nav>
      <div className="articles">
        {data.map((item, id) => {
          return <Article key={id} {...item} />;
        })}
      </div>
    </main>
  );
}

export default App;
