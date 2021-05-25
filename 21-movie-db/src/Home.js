import React from "react";
import Form from "./SearchForm";
import Movies from "./Movies";
const Home = () => {
  return (
    <main>
      <section className="section">
        <Form />
      </section>
      <section className="section">
        <Movies />
      </section>
    </main>
  );
};

export default Home;
