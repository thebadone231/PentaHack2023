import React, { useEffect, useState, Text } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import TypeWriterEffect from 'react-typewriter-effect';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Button } from 'react-bootstrap';
import { paragraph, sentence } from 'txtgen';

import chalkboard from './assets/chalkboard.jpg';

const Dictaphone = () => {
  const [micOn, setMicOn] = useState(false);
  const [score, setScore] = useState(false);
  const [para, setPara] = useState(paragraph(1));
  const [performance, setPerformance] = useState(false);
  const [history, setHistory] = useState([]);
  const [TypeWrite, setTypewrite] = useState()
  const [clear, setClear] = useState(0);

  let pararender = "";
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  useEffect(()=>{
    setTypewrite(0);
    setClear(clear+1);
  },[para])

  useEffect(()=>{
    setTypewrite(<TypeWriterEffect
                  textStyle={{
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '0.8em',
                  }}
                  cursorColor="white"
                  multiText= {[para]}
                  typeSpeed={50}
                />
  )},[clear])
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
      para
    );
  };

  const handleResetTranscript = () => {
    handleStopListening();
    resetTranscript();
    setScore(false);
    setPerformance(false);
    setPara(paragraph(1));
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
    updateScore(score);
  };

  function updateScore(score) {
    if (score) {
      setHistory((prevHistory) => [...prevHistory, score]);
    }
  }

  const getBackgroundColor = (score) => {
    if (score >= 90) {
      return 'green';
    } else if (score >= 70) {
      return 'gold';
    } else if (score >= 50) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  const displayhistory = history.map((item, index) => (
    <li
      key={index}
      style={{
        width: '600px',
        paddingTop: '10px',
        paddingBottom: '10px',
        backgroundColor: getBackgroundColor(item),
      }}
    >
      {item}
    </li>
  ));

  return (
    <div style={{ height: '100vh', 
                  backgroundSize: '100% 100%', 
                  background: "linear-gradient(60deg, rgba(2,0,36,1) 10%, rgba(9,104,121,0.8) 50%, rgba(0,212,255,1) 90%)" }}>
      <Parallax pages={5}>
        {/*page 1 - typewriter effect*/}
        <ParallaxLayer>
          <div
            style={{
              display: 'flex',
              
              alignItems: 'center',
              flexDirection: 'column',
              color: 'white',
              fontWeight: 500,
              fontSize: '0.8em',
              marginTop: 10,
            }}
          >
            <p style={{
              color: 'white',
              fontWeight: 500,
              fontSize: '4em',
            }}>SpeechRacer</p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '700px',
                height: '250px',
                alignItems: 'center',
                marginTop: 40,
                backgroundSize: '100% 100%',
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
                  fontSize: '3em',
                  marginLeft: 10,
                  textAlign: 'center',
                }}
              >
                {TypeWrite}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <p style={{fontSize: '0.8em'}}>Microphone: {micOn ? 'on' : 'off'}</p>
              <div>
                <Button style={{ marginRight: 20 }} onClick={handleListening}>
                  Start
                </Button>
                <Button
                  style={{ marginRight: 20 }}
                  onClick={handleStopListening}
                >
                  Stop
                </Button>
                <Button style={{}} onClick={handleResetTranscript}>
                  Reset
                </Button>
              </div>
            </div>
            <div style={{
                  fontSize: '1.2em',
                  marginTop: 10,
                }}>
              <p>Your output:</p>
            </div>
            <div style={{
                  height: '100%',
                  width: '75%',
                  fontSize: '1.2em',
                  marginTop: 10,
                  textAlign: 'center',
                }}>
              <p>{transcript}</p>
            </div>
            
            <br></br>
            <p>Score: {score ? performance : '-'}</p>
            <div style={{textAlign:'center',}}>
              {history.length > 0 ? <p>Score History</p> : <p></p>}
              <ul style={{listStyle: 'none', textAlign:'center',paddingLeft :'0px' }}>
                {displayhistory}
              </ul>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};
export default Dictaphone;
