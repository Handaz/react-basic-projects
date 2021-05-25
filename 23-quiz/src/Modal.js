import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { isModalOpen, correct, questions, restartQuiz } = useGlobalContext();

  return (
    <div className={isModalOpen ? "modal-container isOpen" : "modal-container"}>
      <div className="modal-content">
        <h2>Congrats!</h2>
        <p>
          You answered {100 * (correct / questions.length)}% of questions
          correctly
        </p>
        <button className="close-btn" onClick={restartQuiz}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
