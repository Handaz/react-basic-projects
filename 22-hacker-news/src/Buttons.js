import React from "react";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const { loading, page, maxPages, changePage } = useGlobalContext();

  return (
    <div className="btn-container">
      <button disabled={loading} onClick={() => changePage("prev")}>
        Prev
      </button>
      <p>
        {page + 1} of {maxPages}
      </p>
      <button disabled={loading} onClick={() => changePage("next")}>
        Next
      </button>
    </div>
  );
};

export default Buttons;
