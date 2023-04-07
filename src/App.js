import React, { useState, Text } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import TypeWriterEffect from 'react-typewriter-effect';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

import chalkboard from './assets/chalkboard.jpg';

const Dictaphone = () => {
  const [micOn, setMicOn] = useState(false);
  const [score, setScore] = useState(false);
  const [performance, setPerformance] = useState(false);
  const [history, setHistory] = useState([]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleListening = () => {
    SpeechRecognition.startListening({ continuous: true });
    console.log('mic is on');
    setMicOn(true);
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setMicOn(false);
    console.log('mic is off');
    scoring(
      transcript,
      "The thing that's great about this job is the time sourcing the items involves no traveling. I just look online to buy it."
    );
  };

  const handleResetTranscript = () => {
    handleStopListening();
    resetTranscript();
    setScore(false);
    setPerformance(false);
  };

  const scoring = (s1, s2) => {
    // Convert both strings to lowercase
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    // Initialize the distance matrix
    var d = [];
    for (var i = 0; i <= s1.length; i++) {
      d[i] = [];
      d[i][0] = i;
    }
    for (var j = 0; j <= s2.length; j++) {
      d[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (var i = 1; i <= s1.length; i++) {
      for (var j = 1; j <= s2.length; j++) {
        if (s1[i - 1] == s2[j - 1]) {
          d[i][j] = d[i - 1][j - 1];
        } else {
          d[i][j] = Math.min(
            d[i - 1][j] + 1, // Deletion
            d[i][j - 1] + 1, // Insertion
            d[i - 1][j - 1] + 1 // Substitution
          );
        }
      }
    }

    // Return the Levenshtein distance
    let score = Math.round(
      (1 - d[s1.length][s2.length] / Math.max(s1.length, s2.length)) * 100
    );
    setScore(score);
    setPerformance(score + '/100');
  };

  function updateScore(score) {
    if (score) {
      setHistory((prevHistory) => [...prevHistory, score]);
    }
  }
  const displayhistory = history.map((value) => {
    return <p>{value}</p>;
  });

  return (
    <div style={{ height: '100vh', backgroundSize: '100% 100%', background: "linear-gradient(60deg, rgba(2,0,36,1) 10%, rgba(9,104,121,0.8) 50%, rgba(0,212,255,1) 90%)" }}>
      <Parallax pages={5}>
        {/*page 1 - typewriter effect*/}
        <ParallaxLayer>
          <div
            style={{
              display: 'flex',
              height: '100vh',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <p style={{
              color: 'white',
              fontWeight: 500,
              fontSize: '2em',
            }}>SpeechRacer</p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '43%',
                height: '58vh',
                alignItems: 'center',
                marginTop: 40,
                backgroundSize: 'cover',
                backgroundImage: `url(${chalkboard})`,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: '85%',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                  marginLeft: 10,
                }}
              >
                <TypeWriterEffect
                  textStyle={{
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '0.8em',
                  }}
                  cursorColor="white"
                  multiText={[
                    "The thing that's great about this job is the time sourcing the items involves no traveling. I just look online to buy it.",
                  ]}
                  typeSpeed={50}
                />
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <p style={{
                color: 'white',
                fontWeight: 500,
                fontSize: '0.8em',
              }}>Microphone: {micOn ? 'on' : 'off'}</p>
              <div>
                <button style={{ marginRight: 20 }} onClick={handleListening}>
                  Start
                </button>
                <button
                  style={{ marginRight: 20 }}
                  onClick={handleStopListening}
                >
                  Stop
                </button>
                <button style={{}} onClick={handleResetTranscript}>
                  Reset
                </button>
              </div>
            </div>
            <p>{transcript}</p>
            <br></br>
            <p>Score: {score ? performance : '-'}</p>
            <div>
              {history.length > 0 ? <p>Score History</p> : <p></p>}
              {history.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
              <button style={{}} onClick={() => updateScore(score)}>
                Update Score
              </button>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};
export default Dictaphone;
