import React from 'react';
import './css/terminal.css';
import pic from './media/me.jpg';

const SHELL_PROMPT = '→$';

const EXPERIENCE = {
  from: 'Feb 2022',
  to: 'April 2023',
  Title: 'Software Developer',
  at: 'Luminance AI',
  details: 'Details \ngo \nhere',
};

// const ABOUT = {
//   details: 'Hi, my name is Rowan. I am a fullstack developer
// looking for new opportunities to grow. I\'ve worked as a fullstack engineer for over a year.',
// };

// function Experience() {
//   return (
//     <p>

//     </p>
//   );
// }
/* eslint-disable react/prop-types */
function Initial({ date }) {
  return (
    <pre>
      Welcome to Rowan&apos;s terminal - v1.0.0
      <br />
      {date.toUTCString()}
      {/* eslint-enable react/prop-types */}
      <br />
      <br />
      Documentation: type &quot;help&quot;
    </pre>
  );
}

function About() {
  return (
    <div>
      <p>
        Hi, my name is Rowan. I&apos;m a fullstack developer looking for new opportunities to grow.
        I&apos;ve worked as a fullstack engineer at
        <a href="https://luminance.com" target="_blank" rel="noopener noreferrer">Luminance</a>
        for over a year.
      </p>
      <img src={pic} alt="Me" />
    </div>
  );
}

export default function Terminal() {
  const [terminalHistory, setTerminalHistory] = React.useState([
    {
      type: 'initial',
      details: Initial({ date: new Date() }),
      id: 0,
    },
  ]);
  const [inputVal, setInputVal] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
    }
  });

  const history = terminalHistory.map((value) => {
    const key = value.id;
    const content = value.details;
    const className = value.type;
    if (!(['prior-input', 'experience', 'about', 'help', 'exception', 'education', 'initial'].includes(className))) {
      throw new Error(`unhandled history type found: ${className}`);
    }
    const inputStylingElement = (
      <span>{SHELL_PROMPT}</span>
    );

    return (
      <div key={key} className={`history-item ${className}`}>
        {className === 'prior-input' ? inputStylingElement : null}
        {content}
      </div>
    );
  });

  function handleInput(string) {
    const historyClone = [...terminalHistory];
    historyClone.push({ type: 'prior-input', details: string, id: historyClone.length });
    switch (string) {
      case 'help':
        historyClone.push({ type: 'help', details: 'Available commands are:\n - help\n - about\n - experience', id: historyClone.length });
        break;
      case 'about':
        historyClone.push({ type: 'about', details: About(), id: historyClone.length });
        break;
      case 'education':
        historyClone.push({ type: 'education', details: 'University of Durham, Physics BSc, First', id: historyClone.length });
        break;
      case 'experience':
        historyClone.push({ type: 'experience', ...EXPERIENCE, id: historyClone.length });
        break;
      default:
        historyClone.push({ type: 'exception', details: 'Error: Unexpected input. Type "help" for available commands', id: historyClone.length });
    }
    setTerminalHistory(historyClone);
    setInputVal('');
  }

  function scrollToEl(el) {
    el.scrollTo(0, el.scrollHeight);
  }

  return (
    <div className="terminal-container">
      <div className="terminal">
        {history}
        <div className="input-line">
          <span>{SHELL_PROMPT}</span>
          <input
            value={inputVal}
            onChange={(event) => {
              setInputVal(event.currentTarget.value);
            }}
            onKeyUp={(event) => {
              if (event.key !== 'Enter') return;
              handleInput(event.currentTarget.value);
              scrollToEl(event.currentTarget);
            }}
            type="text"
            spellCheck="false"
            ref={inputRef}
            /* eslint-disable jsx-a11y/no-autofocus */
            autoFocus
            /* eslint-enable jsx-a11y/no-autofocus */
          />
        </div>
      </div>
    </div>
  );
}
