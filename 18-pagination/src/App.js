import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const { loading, data } = useFetch(page);

  const prevPage = () => {
    if (page === 0) setPage(90);
    else setPage(page - 10);
  };
  const nextPage = () => {
    if (page === 90) setPage(0);
    else setPage(page + 10);
  };

  useEffect(() => {
    setUsers(data);
  }, [data]);

  if (loading) {
    return <h1 className="section-title">Loading...</h1>;
  }

  return (
    <main>
      <div className="section-title">
        <h1>Pagination</h1>
        <div className="underline"></div>
      </div>
      <div className="container followers">
        {users.map((person, index) => {
          return <Follower key={index} {...person} />;
        })}
      </div>
      <div className="btn-container">
        <button className="prev-btn" onClick={prevPage}>
          Prev
        </button>
        {users.map((item, index) => {
          return (
            <button
              key={index}
              className={`page-btn ${
                index * 10 === page ? "active-btn" : null
              }`}
              onClick={() => setPage(index * 10)}
            >
              {index + 1}
            </button>
          );
        })}
        <button className="next-btn" onClick={nextPage}>
          Next
        </button>
      </div>
    </main>
  );
}

export default App;
