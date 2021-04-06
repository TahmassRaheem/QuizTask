import React, { useState, useEffect, useCallback } from "react";
import Options from "./options";
import axios from "axios";
function App() {
  const quesurl = "http://localhost:3333/question_list";
  const optionurl = "http://localhost:3333/options_list";
  const [question, setquestion] = useState(null);
  const [options, setoptions] = useState(null);
  const [selectedradio, setselectedradio] = useState(null);
  const [score, setscore] = useState(null);
  let content = null;

  useEffect(() => {
    axios.get(quesurl).then((response) => {
      setquestion(response.data);
    });
    axios.get(optionurl).then((response) => {
      setoptions(response.data);
    });
  }, []);

  const onValueChange = (e) => {
    setselectedradio(e.target.value);
  };

  if (question && options) {
    content = (
      <div>
        {question.map((question) => {
          return (
            <div>
              <h2>{question.title}</h2>
              <ul>
                {options.map((options, i) => {
                  if (options.related_question === question.id)
                    return (
                      <div>
                        <input
                          type="radio"
                          value={options.correct_answer_to_question}
                          onChange={onValueChange}
                        />
                        {options.title}
                      </div>
                    );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
    if (selectedradio) {
      setscore(question.points);
    } else {
      console.log("wrong choice");
    }
  }

  return (
    <div>
      {content}
      <Options title={score} />
    </div>
  );
}

export default App;
