import React from 'react';
import RecordRTC from "../RecordRTC_files/RecordRTC";

import "./mulbtn.css";




function MulBtn({ buttonStat, setButtonStat, socket, status, recordAudio, setRecordAudio }) {
   const startRecording = function () {
      setButtonStat("stop")
      console.log(socket)

      navigator.getUserMedia({
         audio: true
      }, function (stream) {
         setRecordAudio(recordAudio = RecordRTC(stream, {
            type: 'audio',
            mimeType: 'audio/webm',
            sampleRate: 44100,
            //recorderType: StereoAudioRecorder,
            numberOfAudioChannels: 1,
            //timeSlice: 5000,

            ondataavailable: function (blob) {
               console.log(blob);
               socket.send(blob, { binary: true });

            }
         }));
         console.log(recordAudio)
         recordAudio.startRecording();
      }, function (error) {
         console.error(JSON.stringify(error));
      });

   };
   const stopRecording = function () {
      recordAudio.stopRecording(function () {
         setButtonStat("start")
         recordAudio.getDataURL(function (audioDataURL) {
            var files = {
               type: "audio",
               audio: {
                  type: recordAudio.getBlob().type || 'audio/wav',
                  dataURL: audioDataURL
               }
            };

            socket.sendMessage
               (JSON.stringify(files));
         });
      });
   };



   switch (buttonStat) {
      case "waiting connect":
         return (
            <div className="btn-wrap" >
               <button className="btn btn--wait" disabled={status}>waiting for connect</button>
            </div>
         )
      case "start":
         return (
            <div className="btn-wrap" >
               <button className="btn btn--start" onClick={() => startRecording()}>Start</button>
            </div>
         )
      case "stop":
         return (
            <div className="btn-wrap" >
               <button className="btn btn--stop" onClick={(e) => stopRecording()}>Stop</button>
            </div>
         )

   }
}
export default MulBtn