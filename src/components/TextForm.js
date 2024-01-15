import React, { useEffect, useState } from "react";

const TextForm = (props) => {
  const [text, setText] = useState("Enter your text here to modify");
  const [textEnterClick, SetTextEnterClick] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleOnChange = (e) => {
    setText(e.target.value);
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
    var text = document.getElementById("textBox");
    text.select();
    text.setSelectionRange(0, 9999);
    navigator.clipboard.writeText(text.value);
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
                justifyContent: "center",
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
        </div>
        <button className="btn btn-dark mx-0" onClick={handleClickUp}>
          UPPERCASE
        </button>
        <button className="btn btn-dark mx-2" onClick={handleClickDown}>
          lowercase
        </button>
        <button className="btn btn-dark mt-0 mx-0" onClick={handleClearClick}>
          Clear Console
        </button>
        <button className="btn btn-dark mt-0 mx-2" onClick={handleExtraSpaces}>
          Remove Spaces
        </button>
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
