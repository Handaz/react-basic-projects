import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // Default values
  const [index, setIndex] = useState(0);
  const [waiting, setWaiting] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [correct, setCorrect] = useState(0);

  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch quiz
  const fetchQuiz = async (url) => {
    setWaiting(false);
    setLoading(true);
    const response = await axios.get(url).catch((err) => {
      console.log(err);
    });
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  // Handle answer
  const handleAnswer = (val) => {
    if (val) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  // Switch question
  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  // Handle modal and quiz restart
  const openModal = () => {
    setIsModalOpen(true);
  };

  const restartQuiz = () => {
    setIsModalOpen(false);
    setWaiting(true);
    setCorrect(0);
  };

  // Handle form change
  const handleChange = (e) => {
    const name = e.target.id;
    const val = e.target.value;
    setQuiz({ ...quiz, [name]: val });
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;

    fetchQuiz(url);
  };

  return (
    <AppContext.Provider
      value={{
        quiz,
        handleSubmit,
        loading,
        error,
        waiting,
        questions,
        index,
        handleChange,
        handleAnswer,
        correct,
        nextQuestion,
        isModalOpen,
        restartQuiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
