import React, { useState, useEffect, Text } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import TypeWriterEffect from 'react-typewriter-effect';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Button } from 'react-bootstrap';

import chalkboard from './assets/chalkboard.jpg';
import { paragraph, sentence } from 'txtgen';
const Dictaphone = () => {
  const [para, setPara] = useState(paragraph(3));
  const [micOn, setMicOn] = useState(false);
  const [TypeWrite, setTypewrite] = useState();
  const [clear, setClear] = useState(0);

  let pararender = '';
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // const TypeWrite = () => {
  //   return(
  //     <TypeWriterEffect
  //       textStyle={{
  //         color: 'white',
  //         fontWeight: 500,
  //         fontSize: '0.8em',
  //       }}
  //       cursorColor="white"
  //       multiText= {para}
  //       typeSpeed={50}
  //     />
  //   )
  // }

  //Clear and rereference TypeWriterEffect Componenet
  useEffect(() => {
    setTypewrite(0);
    setClear(clear + 1);
  }, [para]);

  useEffect(() => {
    setTypewrite(
      <TypeWriterEffect
        textStyle={{
          color: 'white',
          fontWeight: 500,
          fontSize: '0.8em',
        }}
        cursorColor="white"
        multiText={[para]}
        typeSpeed={50}
      />
    );
  }, [clear]);
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
    setPara(paragraph(3));
    console.log(para);
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
      return 'yellow';
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
              height: '100vh',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <p
              style={{
                color: 'white',
                fontWeight: 500,
                fontSize: '2em',
              }}
            >
              SpeechRacer
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '43%',
                height: '58vh',
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
                  marginLeft: 10,
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
              <p style={{
                color: 'white',
                fontWeight: 500,
                fontSize: '0.8em',
                marginTop: 10,
              }}>Microphone: {micOn ? 'on' : 'off'}</p>
              <div>
                <Button style={{ marginRight: 20 }} onClick={handleListening}>
                  Start
                </button>
                <button
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
            <p>{transcript}</p>
            <br></br>
            <p>Score: {score ? performance : '-'}</p>
            <div style={{ textAlign: 'center' }}>
              {history.length > 0 ? <p>Score History</p> : <p></p>}
              <ul
                style={{
                  listStyle: 'none',
                  textAlign: 'center',
                  paddingLeft: '0px',
                }}
              >
                {displayhistory}
              </ul>
              <button onClick={() => updateScore(score)}>
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
