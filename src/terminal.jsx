import React from 'react';

export default function terminal() {
  const [info, setInfo] = React.useState(null);
  return (
    <div className="terminal-container">
      <div className="terminal" />
    </div>
  );
}
