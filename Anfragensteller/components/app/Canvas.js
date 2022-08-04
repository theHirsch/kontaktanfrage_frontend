import React from "react";

export default function Canvas(props) {
  return (
    <section>
      <div className="container">
        <div id="all_notes">
          <div id="container_notes" onClick={props.addNoteUI}>
            {/* view all notes here */}
            {props.notes.map((note,i) => {
              return (
                <div key={i}
                  className="note"
                  style={{
                    top: note.positionY + "px",
                    left: note.positionX + "px",
                    position: "absolute",
                  }}
                >
                  <div className="details">
                    <h1>{note.text}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}