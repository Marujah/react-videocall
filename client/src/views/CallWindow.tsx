import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

import videoIcon from '../images/video-camera.svg';
import microIcon from '../images/mic.svg';
import hangUpIcon from '../images/phone-hang-up.svg';
import shareIcon from '../images/share.svg';
import MediaDevice from '../utils/MediaDevice';

interface Props {
    status: string;
    localSrc?: any;
    peerSrc?: any;
    mediaDevice?: MediaDevice;
    endCall(state: boolean): void;
};

const getButtonClass = (icon, enabled) => classnames(`bg-none border-none cursor-pointer round-icon icon-${icon} mr-4`, { disable: !enabled });

const CallWindow: React.FunctionComponent<Props> = ({
    peerSrc,
    localSrc,
    mediaDevice,
    status,
    endCall,
}) => {
    const peerVideo = useRef(null);
    const localVideo = useRef(null);
    const [video, setVideo] = useState(true);
    const [audio, setAudio] = useState(true);

    useEffect(() => {
        if (peerVideo.current && peerSrc) peerVideo.current.srcObject = peerSrc;
        if (localVideo.current && localSrc) localVideo.current.srcObject = localSrc;
    });

    useEffect(() => {
        if (mediaDevice) {
            mediaDevice.toggle('Video', video);
            mediaDevice.toggle('Audio', audio);
        }
    });

    /**
     * Turn on/off a media device
     * @param {String} deviceType - Type of the device eg: Video, Audio
     */
    const toggleMediaDevice = (deviceType) => {
        if (deviceType === 'video') {
            setVideo(!video);
        }
        if (deviceType === 'audio') {
            setAudio(!audio);
        }
    };

    return (
        <div className={classnames('call-window', status)}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
                id='peerVideo'
                ref={peerVideo}
                autoPlay
                playsInline
            />
            <video
                id='localVideo'
                ref={localVideo}
                autoPlay
                playsInline
                muted
            />
            <div className='video-control'>
                <button
                    key='btnVideo'
                    type='button'
                    className={getButtonClass(video ? 'on' : 'off', video)}
                    onClick={() => toggleMediaDevice('video')}
                >
                    <img alt='video' src={videoIcon} />
                </button>
                <button
                    key='btnAudio'
                    type='button'
                    className={getButtonClass(audio ? 'on' : 'off', audio)}
                    onClick={() => toggleMediaDevice('audio')}
                >
                    <img alt='mic' src={microIcon} />
                </button>
                <button
                    type='button'
                    className='bg-none border-none cursor-pointer round-icon icon-off mr-4'
                    onClick={() => endCall(true)}
                >
                    <img alt='hang up' src={hangUpIcon} />
                </button>
            </div>
        </div>
    );
}

export default CallWindow;
