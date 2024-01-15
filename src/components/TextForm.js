import React, { useEffect, useRef, useState } from "react";

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
            className="btn btn-tranparent mx-0 "
            style={{
              position: "absolute",
              bottom: 0,
              height: "1.5rem",
              display: "flex",
              alignItems: "center",

              border: "1px solid black",
            }}
            onClick={handleClearClick}
          >
            Clear Console
          </button>
          <button
            className="btn btn-tranparent "
            style={{
              position: "absolute",
              bottom: 0,
              height: "1.5rem",
              display: "flex",
              alignItems: "center",
              left: "17.5%",
              border: "1px solid black",
            }}
            onClick={handleUndo}
          >
            Undo
          </button>
        </div>
        <div className="">
          <button className="btn btn-dark mx-2" onClick={handleClickUp}>
            UPPERCASE
          </button>
          <button className="btn btn-dark mx-2" onClick={handleClickDown}>
            lowercase
          </button>

          <button className="btn btn-dark mx-2" onClick={handleExtraSpaces}>
            Remove Spaces
          </button>
          <button className="btn btn-dark mt-1" onClick={handleTextSppech}>
            Speech
          </button>
          <button className="btn btn-dark mx-2" onClick={handleCapitalizeWords}>
            Capitalize Words
          </button>
          <button
            className="btn btn-dark mx-2"
            onClick={handleCapitalizeSentences}
          >
            Capitalize Sentences
          </button>
        </div>
      </div>
      <div className="container my-3">
        <h2>Your text summary</h2>
        <p>{text.split(" ").length} words</p>
        <p>{text.length} characters</p>
        <p>{0.008 * text.split(" ").length} Minutes need to read</p>
        <h2>Preview</h2>
        <p>{text ? text : "Check preview here"}</p>
      </div>
    </>
  );
};

export default TextForm;
