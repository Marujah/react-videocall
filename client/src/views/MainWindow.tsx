import React, { useState } from 'react';
import { Configuration } from '../models/Configuration';

import videoIcon from '../images/video-camera.svg';
import phoneIcon from '../images/phone.svg';
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
        <div className='container flex flex-col items-center justify-center'>
            <div>
                <h3>
                    Hi, your ID is
          <input
                        type='text'
                        className='txt-clientId'
                        defaultValue={clientId}
                        readOnly
                    />
                </h3>
                <h4>Get started by calling a friend below</h4>
            </div>
            <div>
                <input
                    type='text'
                    className='txt-clientId'
                    spellCheck={false}
                    placeholder='Your friend ID'
                    onChange={(event) => setFriendID(event.target.value)}
                />
                <div className='mt-4 flex items-center justify-center'>
                    <button
                        type='button'
                        className='bg-none border-none cursor-pointer round-icon mr-4'
                        onClick={callWithVideo(true)}
                    >
                        <img src={videoIcon} alt='video call' />
                    </button>
                    <button
                        type='button'
                        className='bg-none border-none cursor-pointer round-icon'
                        onClick={callWithVideo(false)}
                    >
                        <img src={phoneIcon} alt='phone call' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MainWindow;
