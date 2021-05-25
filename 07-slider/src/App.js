import React, { useState, useEffect } from "react";
import Slide from "./Slide";
import data from "./data";
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // lastIndex value equals to the last index in the list
    const lastIndex = people.length - 1;
    // If current index is less, than 0, then we set it equal to the lastIndex
    // so we access the last person in the list
    if (index < 0) setIndex(lastIndex);
    // If current index is exceeding the lastIndex value, than we set it
    // equal to 0, so we access the first person in the list
    else if (index > lastIndex) setIndex(0);
  }, [index, people]);

  useEffect(() => {
    // Set an interval for auto-slide
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    // Set a cleanup function, so we don't face any bugs
    return () => clearInterval(slider);
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span> reviews
        </h2>
      </div>
      <Slide people={people} index={index} setIndex={setIndex} />
    </section>
  );
}

export default App;
