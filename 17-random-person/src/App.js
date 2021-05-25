import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prop, setProp] = useState("name");
  const [val, setVal] = useState("random person");

  // results: name (first, last) , email, dob (age), location (street (number, name)), phone, password, picture (large)
  const fetchUser = async () => {
    try {
      const response = await fetch(`${url}`);
      const data = await response.json();
      const { results } = data;
      if (results) {
        const { name, email, dob, location, phone, login, picture } =
          results[0];
        setPerson({
          name: name.first + " " + name.last,
          email,
          age: dob.age,
          street: location.street.number + " " + location.street.name,
          phone,
          password: login.password,
          picture: picture.large,
        });
        setVal(name.first + " " + name.last);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const displayProp = (e) => {
    if (e.target.classList.contains("icon")) {
      const newVal = e.target.dataset.label;
      setProp(newVal);
      setVal(person[newVal]);
    }
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.picture) || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {prop} is</p>
          <p className="user-value">{val}</p>
          <ul className="values-list">
            <li className="icon" data-label="name" onMouseOver={displayProp}>
              <FaUser />
            </li>
            <li className="icon" data-label="email" onMouseOver={displayProp}>
              <FaEnvelopeOpen />
            </li>
            <li className="icon" data-label="age" onMouseOver={displayProp}>
              <FaCalendarTimes />
            </li>
            <li className="icon" data-label="street" onMouseOver={displayProp}>
              <FaMap />
            </li>
            <li className="icon" data-label="phone" onMouseOver={displayProp}>
              <FaPhone />
            </li>
            <li
              className="icon"
              data-label="password"
              onMouseOver={displayProp}
            >
              <FaLock />
            </li>
          </ul>
          <button className="btn" onClick={fetchUser}>
            random user
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
