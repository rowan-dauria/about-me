import React from 'react';
import './css/terminal.css';
import pic from './media/me.jpg';

const SHELL_PROMPT = '→$';

function Experience() {
  return (
    <p>
      Feb 2022 - April 2023    Software Developer at Luminance
      <br />
      - Fullstack engineer for AI contract management platform. Used by
      <strong> Tesco</strong>
      ,
      <strong> Clifford Chance </strong>
      and more.
      <br />
      - Promoted twice after less than a year in the role.
      <br />
      - Led the development of an interactive data dashboard using
      <strong> BackboneJS </strong>
      (frontend framework) and
      <strong> ElasticSearch </strong>
      for Luminance&apos;s flagship product,
      implementing a configurable interface that provides a qualitative overview
      of the client&apos;s data.
      <br />
      - Created a range of new API functionality in
      <strong> ExpressJS </strong>
      to secure Luminance&apos;s largest ever deal. Took ownership of the whole
      development lifecycle by designing and implementing API tests with
      <strong> MochaJS</strong>
      .
      <br />
      - Delivered time-pressured fixes for frontend and backend bugs. Solved a
      frontend bug that had been outstanding for over 6 months, receiving a bug bounty
      as a result.
      <br />
      - Took ownership of feature development, utilising Gitlab to manage
      parallel workstreams and implement CI/CD pipelines.
      <br />
      <br />
      June 2021 - Feb 2022    Technology Specialist at Luminance
      <br />
      - Managed client data migrations from legacy systems, automating data exports,
      providing 2nd level support for technical issues.
      <br />
      - Was recommended for a software development role due to exceptional performance
      as a Technology Specialist.
      <br />
      - Scripting for the internal
      <strong> Python </strong>
      API to automate data cleaning processes. Was the internal API expert whilst in the team.
      <br />
      - Automated data extraction exercises, engaging with clients to understand their reporting
      needs and delivering bespoke reports.
    </p>
  );
}

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

function Help() {
  return (
    <p>
      Available commands are:
      <br />
      - about
      <br />
      - education
      <br />
      - experience
      <br />
      - help
    </p>
  );
}

function Education() {
  return (
    <p>
      University of Durham, Physics BSc, First
    </p>
  );
}

function About() {
  return (
    <div>
      <p>
        Hi, my name is Rowan. I&apos;m a fullstack engineer looking for new opportunities to grow.
        I&apos;ve spent the last 14 months building the
        <a href="https://luminance.com" target="_blank" rel="noopener noreferrer">Luminance</a>
        app.
      </p>
      <img src={pic} alt="Me" />
      <p>
        <a href="https://www.linkedin.com/in/rowan-d-auria/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://www.github.com/rowan-dauria" target="_blank" rel="noopener noreferrer">GitHub</a>
      </p>
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
        historyClone.push({ type: 'help', details: Help(), id: historyClone.length });
        break;
      case 'about':
        historyClone.push({ type: 'about', details: About(), id: historyClone.length });
        break;
      case 'education':
        historyClone.push({ type: 'education', details: Education(), id: historyClone.length });
        break;
      case 'experience':
        historyClone.push({ type: 'experience', details: Experience(), id: historyClone.length });
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
