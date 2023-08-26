import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import MulBtn from "./mulbtn"

import './app.css';




function App() {
   const [recordAudio, setRecordAudio] = useState({});
   const [buttonStat, setButtonStat] = useState("waiting connect")
   const [status, setStatus] = useState(true)



   const WS_URL = "ws://localhost:9001";
   const socket = useWebSocket(WS_URL, {
      onOpen: () => {
         console.log("Connect");
         setButtonStat("start");
         setStatus(false)
      },

      onMessage: (data) => {
         console.log('Сообщение', JSON.parse(data.data));
      },

      onError: (error) => {
         console.error("Error", error)
      },
      onClose: () => {
         setButtonStat("waiting connect");
         setStatus(true)
         console.info('Соединение разорвано');
      }

   })

   return (
      <div>
         <MulBtn
            buttonStat={buttonStat}
            setButtonStat={setButtonStat}
            socket={socket}
            status={status}
            recordAudio={recordAudio}
            setRecordAudio={setRecordAudio}
         />
      </div>
   )
}

export default App

