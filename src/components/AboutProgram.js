/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AboutProgram.css";

const AboutProgram = () => {
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answer, setAnswer] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [firstAttemptCorrect, setFirstAttemptCorrect] = useState(true);
  const [correctlyAnswered, setCorrectlyAnswered] = useState([]);
  const [wronglyAnswered, setWronglyAnswered] = useState([]);
  const code = user.details.uniqueCode;

  const getQuestions = () => {
    axios
      .get("/questionsone")
      .then((response) => {
        if (!response.data.err) {
          const fetchedQuestions = response.data[0].questions;
          setQuestions(fetchedQuestions);
          setAnswer(response.data[0].answers);
          setCorrectlyAnswered(Array(fetchedQuestions.length).fill(false));
          setWronglyAnswered(Array(fetchedQuestions.length).fill(false));
        } else {
          console.error("Error fetching questions:", response.data.err);
        }
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const handleAnswerSelect = (optionIndex) => {
    const correctAnswerIndex = answer[currentQuestionIndex];
    const isCorrect = optionIndex === correctAnswerIndex;

    if (isCorrect) {
      if (!correctlyAnswered[currentQuestionIndex]) {
        setCorrectCount((prevCount) => prevCount + 1);
        setCorrectlyAnswered((prev) => {
          const newArr = [...prev];
          newArr[currentQuestionIndex] = true;
          return newArr;
        });
      }
      setSelectedAnswer({
        correct: correctAnswerIndex,
        selected: optionIndex,
        incorrect: [],
      });
      // Reset wronglyAnswered for the current question
      setWronglyAnswered((prev) => {
        const newArr = [...prev];
        newArr[currentQuestionIndex] = false; // Change null to false
        return newArr;
      });
    } else {
      const incorrectOptions = questions[currentQuestionIndex].options
        .map((_, index) => index)
        .filter((index) => index !== correctAnswerIndex);
      setSelectedAnswer({
        correct: correctAnswerIndex,
        selected: optionIndex,
        incorrect: incorrectOptions,
      });
      setWronglyAnswered((prev) => {
        const newArr = [...prev];
        newArr[currentQuestionIndex] = true;
        return newArr;
      });
      setFirstAttemptCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== "") {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  const handleFinishProgram = () => {
    handleResult();
  };

  const handleResult = () => {
    const resultData = {
      userId: user.details._id,
      name: user.details.name,
      email: user.details.email,
      code: code,
      correctAnswers: correctCount,
      totalQuestions: questions.length,
      firstAttemptCorrect: firstAttemptCorrect,
      programnum: 1,
      correctlyAnswered,
      wronglyAnswered,
    };
    console.log(resultData,"resultData");
    axios
      .post("/result", resultData)
      .then((response) => {
        console.log(response.data.msg);
        navigate("/programs");
      })
      .catch((error) => {
        console.error("Error saving result:", error);
      });
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
 
  return (
    <div className="about-containermain">
<div className="about-container">
        <img
          src="/Ethara - Lockup_ADNOC_NEG.png"
          alt="Logo"
          className="abtpro-logo"
        />
        <h2>TRIVIA TIME</h2>
        <h3>
          Question {currentQuestionIndex + 1}/{questions.length}
        </h3>
        <p>{currentQuestion.question}</p>
        <div className="options-container">
          {currentQuestion.options.map((option, index) => {
            const isOptionSelected = selectedAnswer.selected === index;
            const isCorrect = selectedAnswer.correct === index;
            const isIncorrect =
              selectedAnswer.incorrect &&
              selectedAnswer.incorrect.includes(index);
            const optionClass = isCorrect
              ? "correct"
              : isIncorrect
              ? "incorrect"
              : "";

            return (
              <div
                key={index}
                className={`answer-option ${
                  isOptionSelected ? "selected" : ""
                } ${optionClass}`}
                onClick={() => handleAnswerSelect(index)}
              >
                {option}
              </div>
            );
          })}
        </div>
        {showAlert && (
          <div className="alert-message">Please select an answer!</div>
        )}
        <button
          className="next-button"
          onClick={handleNextQuestion}
          style={{
            display:
              currentQuestionIndex === questions.length - 1 ? "none" : "block",
          }}
        >
          Next Question
        </button>
        {currentQuestionIndex === questions.length - 1 && (
          <button onClick={handleFinishProgram}>Finish Program</button>
        )}
        <ToastContainer />
      </div>
    </div>
      
  );
};

export default AboutProgram;
