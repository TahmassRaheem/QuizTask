import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
  const [question1, setQuestion1] = useState();
  const [question2, setQuestion2] = useState();
  const [optionsQ2, setOptionsQ2] = useState();
  const [optionsQ1, setOptionsQ1] = useState();
  const [score, setScore] = useState(0);

  useEffect(() => {
    const FetchQuestionList = async () => {
      await axios
        .get("http://localhost:3333/question_list")
        .then((res) => {
          let questionOne = res?.data?.splice(0, 1);
          setQuestion1(questionOne);
          let questionTwo = res?.data?.splice(0, 1);
          setQuestion2(questionTwo);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    FetchQuestionList();
    const FetchOptions = async () => {
      await axios
        .get("  http://localhost:3333/options_list")
        .then((res) => {
          let questionTwoOptions = res?.data?.splice(0, 2);
          setOptionsQ2(questionTwoOptions);
          let questionOneOptions = res?.data?.splice(0, 3);
          setOptionsQ1(questionOneOptions);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    FetchOptions();
  }, []);

  const onChangeValue = (event) => {
    console.log(event.target.value);
    if (event.target.value) {
      if (event.target.value == 17) {
        setScore((prevState) => prevState + 10);
      } else if (event.target.value == 18) {
        setScore((prevState) => prevState + 20);
      }
    } else {
      alert("Your answer is wrong");
    }
  };

  return (
    <div>
      <h2>Score : {score}</h2>
      <h3>{question1 ? question1[0]?.title : "Please wait..."}</h3>

      {optionsQ1 &&
        optionsQ1?.map((item, index) => {
          return (
            <div onChange={onChangeValue}>
              <input
                type="radio"
                value={item.correct_answer_to_question}
                name="hh"
              />
              {item.title}
            </div>
          );
        })}
      <h3>{question2 && question2[0].title}</h3>
      {optionsQ2 &&
        optionsQ2?.map((item, index) => {
          return (
            <div onChange={onChangeValue}>
              <input
                type="radio"
                value={item.correct_answer_to_question}
                name="test"
              />
              {item.title}
            </div>
          );
        })}
    </div>
  );
};

export default App;
