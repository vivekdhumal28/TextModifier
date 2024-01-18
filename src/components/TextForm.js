import React, { useEffect, useRef, useState } from "react";
import Elaborate from "./Elaborate";
import Replace from "./Replace";

const TextForm = (props) => {
  const [text, setText] = useState("Enter your text here to modify");
  const [textEnterClick, SetTextEnterClick] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const textHistory = useRef([]);

  const handleOnChange = (e) => {
    let newText = e.target.value;
    setText(newText);
    textHistory.current.push(newText);
  };

  const handleUndo = () => {
    if (textHistory.current.length > 1) {
      textHistory.current.pop();
      const previousText = textHistory.current.pop();
      setText(previousText);
    }
  };

  const handleClickUp = () => {
    let upperText = text.toUpperCase();
    setText(upperText);
  };

  useEffect(() => {
    if (textEnterClick) {
      clearConsole();
    }
  }, [textEnterClick]);

  const handleFirstClick = () => {
    SetTextEnterClick(true);
    textHistory.current = [text];
  };

  const clearConsole = () => {
    setText("");
  };

  const handleClickDown = () => {
    let lowerText = text.toLowerCase();
    setText(lowerText);
  };

  const handleClearClick = () => {
    let clearText = "";
    setText(clearText);
  };

  const handleExtraSpaces = () => {
    let spaces = text.replace(/\s+/g, " ");
    setText(spaces);
  };

  const handleCopy = () => {
    let text = document.getElementById("textBox");
    if (text) {
      text.select();
      text.setSelectionRange(0, 9999);
      navigator.clipboard.writeText(text.value);
    }
  };

  const handleTextSppech = () => {
    if ("speechSynthesis" in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);

      synthesis.cancel();
      synthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  const handleCapitalizeWords = () => {
    let CapWords = text.replace(/\b\w/g, (match) => match.toUpperCase());
    setText(CapWords);
  };

  const handleCapitalizeSentences = () => {
    let capitalSentence = text.replace(/(^\w|\.\s+\w)/gm, (match) =>
      match.toUpperCase()
    );
    setText(capitalSentence);
  };

  const handleReplace = ({ replaceText, withText }) => {
    const newText = text.replace(new RegExp(replaceText, "g"), withText);
    setText(newText);
  };

  return (
    <>
      <div className="container">
        <h1>{props.heading}</h1>
        <div
          className="mb-3"
          style={{ position: "relative" }}
          onMouseOver={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
        >
          {isMouseOver && (
            <button
              className="btn btn-dark mr-0"
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                height: "1.5em",
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleCopy}
            >
              Copy
            </button>
          )}
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            onClick={handleFirstClick}
            id="textBox"
            rows="8"
          ></textarea>
          <button
            className="btn btn-tranparent mx-0"
            style={{
              position: "absolute",
              bottom: 0,
              height: "2rem",
              display: "flex",
              alignItems: "center",

              border: "1px solid black",
            }}
            onClick={handleClearClick}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#d3d3dd")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
          >
            🆑
          </button>
          <button
            className="btn btn-tranparent "
            style={{
              position: "absolute",
              bottom: 30,
              height: "2rem",
              display: "flex",
              alignItems: "center",

              border: "1px solid black",
            }}
            onClick={handleUndo}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#d3d3dd")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
          >
            🔄
          </button>
        </div>
        <div className="row row-cols-1">
          <div className="col">
            <button className="btn btn-dark mx-1 my-1" onClick={handleClickUp}>
              UPPERCASE
            </button>
            <button
              className="btn btn-dark mx-1 my-1"
              onClick={handleClickDown}
            >
              lowercase
            </button>

            <button
              className="btn btn-dark mx-1 my-1"
              onClick={handleExtraSpaces}
            >
              Remove Spaces
            </button>
            <button
              className="btn btn-dark mx-1 my-1"
              onClick={handleTextSppech}
            >
              Speech
            </button>
            <button
              className="btn btn-dark mx-1 my-1"
              onClick={handleCapitalizeWords}
            >
              Capitalize Words
            </button>
            <button
              className="btn btn-dark mx-1 my-1"
              onClick={handleCapitalizeSentences}
            >
              Capitalize Sentences
            </button>
          </div>
        </div>
      </div>

      <Replace onReplace={handleReplace} />
      <Elaborate text={text} />
    </>
  );
};

export default TextForm;
