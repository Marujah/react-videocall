import React, { useState } from 'react';
import { Configuration } from '../models/Configuration';

interface Props {
  clientId: string;
  startCall(start: boolean, friend: string, config: Configuration): void; 
}

const MainWindow: React.FunctionComponent<Props> = ({ startCall, clientId }) => {
  const [friendID, setFriendID] = useState(null);
  
  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
  const callWithVideo = (video) => {
    const config = { audio: true, video };
    return () => friendID && startCall(true, friendID, config);
  };


  return (
    <div className="container main-window">
      <div>
        <h3>
          Hi, your ID is
          <input
            type="text"
            className="txt-clientId"
            defaultValue={clientId}
            readOnly
          />
        </h3>
        <h4>Get started by calling a friend below</h4>
      </div>
      <div>
        <input
          type="text"
          className="txt-clientId"
          spellCheck={false}
          placeholder="Your friend ID"
          onChange={(event) => setFriendID(event.target.value)}
        />
        <div>
          <button
            type="button"
            className="btn-action fa fa-video-camera"
            onClick={callWithVideo(true)}
          >Cam</button>
          <button
            type="button"
            className="btn-action fa fa-phone"
            onClick={callWithVideo(false)}
          >Fon</button>
        </div>
      </div>
    </div>
  );
}

export default MainWindow;
