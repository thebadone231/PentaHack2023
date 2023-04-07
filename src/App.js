import React, { useEffect, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import TypeWriterEffect from 'react-typewriter-effect';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

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
  };

  const handleResetTranscript = () => {
    handleStopListening();
    resetTranscript();
    setPara(paragraph(3));
  };
  return (
    <div
      style={{
        height: '100vh',
        backgroundSize: '100% 100%',
        background:
          'linear-gradient(60deg, rgba(2,0,36,1) 10%, rgba(9,104,121,0.8) 50%, rgba(0,212,255,1) 90%)',
      }}
    >
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
              <p
                style={{
                  color: 'white',
                  fontWeight: 500,
                  fontSize: '0.8em',
                }}
              >
                Microphone: {micOn ? 'on' : 'off'}
              </p>
              <div>
                <button style={{ marginRight: 20 }} onClick={handleListening}>
                  Start
                </button>{' '}
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
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};
export default Dictaphone;
