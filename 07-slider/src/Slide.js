import React from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const Slide = ({ people, index, setIndex }) => {
  return (
    <div className="section-center">
      {people.map((person, personIndex) => {
        // Spread info
        const { id, image, name, title, quote } = person;

        // Depending on index toggle class
        let position = "nextSlide";

        // If personIndex equals to the index => this is current clide
        if (personIndex === index) {
          position = "activeSlide";
        }

        // If personIndex equals to the previous index => this is prev slide
        // or if index equals to the first one and personIndex equals to the last
        // person in list => this is prev slide
        if (
          personIndex === index - 1 ||
          (index === 0 && personIndex === people.length - 1)
        ) {
          position = "lastSlide";
        }
        return (
          <article className={position} key={id}>
            <img src={image} alt={name} className="person-img" />
            <h4>{name}</h4>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <button className="prev" onClick={() => setIndex(index - 1)}>
        <FaChevronLeft />
      </button>
      <button className="next" onClick={() => setIndex(index + 1)}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Slide;
