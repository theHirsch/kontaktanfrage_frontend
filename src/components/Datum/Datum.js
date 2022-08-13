import React from 'react';

class TimeFormatter extends React.Component {
    formatter = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
          });
  
    render() {
      const dateString = "2019-10-30T14:01:59.689Z";
  
      return (
        <div>
          Using <code>Date.parse</code>: {this.formatter.format(Date.parse(dateString))}
          <br />
          <em>OR</em>
          <br />
          Using <code>new Date</code>: {this.formatter.format(new Date(dateString))}
        </div>
      );
    }
  }
export default TimeFormatter;