import React, {useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import TypeWriterEffect from 'react-typewriter-effect';
import { Parallax, ParallaxLayer} from '@react-spring/parallax';

import chalkboard from './assets/chalkboard.jpg';

const Dictaphone = () => {
  const [micOn, setMicOn] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (micOn) {
    SpeechRecognition.startListening({continuous: true});
    console.log("mic is on");
  } else {
    SpeechRecognition.stopListening();
    console.log("mic is off");
  }

  return (
    <div style={{height:"100vh", backgroundSize:'100% 100%'}}>

        <Parallax pages={5}>

          {/*page 1 - typewriter effect*/}
          <ParallaxLayer>
            <div style={{display:'flex', height:"100vh", alignItems:'center', flexDirection: 'column'}}>
              <div style={{display: 'flex', flexDirection: 'column', width:"43%", height:'58vh', alignItems:'center', marginTop: 40, backgroundImage:`url(${chalkboard})`}}>
                

                <div style={{height: "100%", width: "85%", display:'flex', alignItems:'center', color:'white', marginLeft: 10}}>
                  <TypeWriterEffect
                    textStyle={{color: 'white', fontWeight: 500, fontSize: '0.8em',}}
                    cursorColor="white"
                    multiText={["The thing that's great about this job is the time sourcing the items involves no traveling. I just look online to buy it. It's really as simple as that. While everyone else is searching for what they can sell, I sit in front of my computer and buy better stuff for less money and spend a fraction of the time doing it."]}
                    typeSpeed={50}/>
                </div>
              </div>

              <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <p>Microphone: {micOn ? 'on' : 'off'}</p>
                  <div>
                      <button style={{marginRight:20}} onClick={() => {setMicOn(true)}}>Start</button>
                      <button style={{marginRight:20}} onClick={() => {setMicOn(false)}}>Stop</button>
                      <button style={{}} onClick={resetTranscript}>Reset</button>
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