import React from "react";

export default function Bottom(props) {
  return (
      <div className="container" id="">
        <div id="Bottom">
          <button
            className="btn btn-outline-danger"
            id="reset_view"
            onClick={props.deleteAll}
          >
            Reset
          </button>
          <button
            className="btn btn-outline-success"
            id="send_request"
            onClick={(e) => props.addNoteUI(e)}
          >
            Absenden
          </button>
        </div>
      </div>
  );
}