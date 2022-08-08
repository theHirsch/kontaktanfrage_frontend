import React from "react";

export default function Header(props) {
  return (
      <div className="container" id="">
        <div id="header">
          <h1>Kontaktanfragenformular</h1>
          <button
            className="btn btn-success"
            id="add_note"
            onClick={(e) => props.addNoteUI(e)}
          >
            Absenden
          </button>{" "}
          <button
            className="btn btn-danger"
            id="remove_note"
            onClick={props.deleteAll}
          >
            Reset
          </button>
        </div>
      </div>
  );
}
