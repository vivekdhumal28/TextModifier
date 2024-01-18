import React from "react";

const Elaborate = ({ text }) => {
  return (
    <>
      <div className="container my-3">
        <div
          style={{
            border: "1px solid grey",
            padding: "1em",
            borderRadius: "5px",
          }}
        >
          <h2>Your text summary</h2>
          <h6>{text === "" ? 0 : text.split(" ").length} Words</h6>
          <h6>{text.length} Characters</h6>
          <p>
            This paragraph requires {0.008 * text.split(" ").length} minutes to
            read.
          </p>
        </div>
        <div>
          <h2>Preview</h2>
          <p>{text ? text : "Check preview here"}</p>
        </div>
      </div>
    </>
  );
};

export default Elaborate;
