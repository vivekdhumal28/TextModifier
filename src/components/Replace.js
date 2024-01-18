import React, { useState } from "react";

const Replace = ({ onReplace }) => {
  const [replaceText, setReplaceText] = useState("");
  const [withText, setWithText] = useState("");

  const handleReplace = () => {
    onReplace({ replaceText, withText });
    setReplaceText("");
    setWithText("");
  };

  return (
    <>
      <div className="container my-3">
        <div
          style={{
            // border: "1px solid black",
            padding: "1em",
            borderRadius: "5px",
            alignItems: "center",
          }}
        >
          <h4>Replace</h4>
          <input
            style={{
              border: "1px solid black",
              borderRadius: "5px",
            }}
            type="text"
            placeholder="Replace"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
          />
          <h4>With</h4>
          <input
            style={{
              border: "1px solid black",
              borderRadius: "5px",
            }}
            type="text"
            placeholder="With"
            value={withText}
            onChange={(e) => setWithText(e.target.value)}
          />
        </div>
        <button className="btn btn-dark mx-3" onClick={handleReplace}>
          Replace
        </button>
      </div>
    </>
  );
};

export default Replace;
