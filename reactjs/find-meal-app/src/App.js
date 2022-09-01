import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import APIFetch from './actions/fetchActions'

// https://jsonplaceholder.typicode.com/
function App() {
    const [speakEnd, setSpeakEnd] = useState(false)
    const [selectedText, setSelectedText] = useState("Government forces in Ukraine are trying to seize the initiative from Russian troops before the arrival of winter. A counter-offensive is already under way in the south and the Ukrainians are now preparing to expand that in the east to take back land lost in Donbas and around Kharkiv in the north. Quentin Sommerville and camera-journalist Darren Conway have been given exclusive access to a unit of Ukrainian troops.")

    const speak = (text,event) => {
        var msg = new SpeechSynthesisUtterance();
        var synth = window.speechSynthesis;
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[2]; // Note: some voices don't support altering params
        msg.voiceURI = 'native';
        msg.volume = 1; // 0 to 1
        msg.rate = 1; // 0.1 to 10
        msg.pitch = 1; //0 to 2
        msg.text = text;
        msg.lang = 'en-GB';
        console.log(text)
        synth.speak(msg);
        setSpeakEnd(true)
        msg.onend = function (e) {
          console.log('Finished in ' + event.elapsedTime + ' seconds.');
          setSpeakEnd(false)
          synth.cancel();
        };
        
      }
    useEffect(() => {
        
        APIFetch.getAllPosts()
        .then(data=>{
            console.log(data)
        })

        
    }, [])
    return (
        <div>
        <Button onClick={(e) => speak(selectedText,e)}>Listen</Button>
           <p>
           Government forces in Ukraine are trying to seize the initiative from Russian troops before the arrival of winter. A counter-offensive is already under way in the south and the Ukrainians are now preparing to expand that in the east to take back land lost in Donbas and around Kharkiv in the north. Quentin Sommerville and camera-journalist Darren Conway have been given exclusive access to a unit of Ukrainian troops.
           </p>
        </div>
    )
}

export default App