import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

interface Props {
    status: string;
    localSrc?: any;
    peerSrc?: any;
    config: ({
        audio: Boolean;
        video: Boolean;
    });
    mediaDevice?: any;
    endCall(state: boolean): void;
};

const getButtonClass = (icon, enabled) => classnames(`btn-action fa ${icon}`, { disable: !enabled });

const CallWindow: React.FunctionComponent<Props> = ({
    peerSrc,
    localSrc,
    config,
    mediaDevice,
    status,
    endCall,
}) => {
    const peerVideo = useRef(null);
    const localVideo = useRef(null);
    const [video, setVideo] = useState(config.video);
    const [audio, setAudio] = useState(config.audio);
    const [frontCam, setFrontCam] = useState(true);

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
            mediaDevice.toggle('Video');
        }
        if (deviceType === 'audio') {
            setAudio(!audio);
            mediaDevice.toggle('Audio');
        }
        if (deviceType === 'cam') {
            setFrontCam(!frontCam);
            mediaDevice.toggle('Audio');
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
                    className={getButtonClass('fa-video-camera', video)}
                    onClick={() => toggleMediaDevice('video')}
                />
                <button
                    key='btnAudio'
                    type='button'
                    className={getButtonClass('fa-microphone', audio)}
                    onClick={() => toggleMediaDevice('audio')}
                />
                <button
                    type='button'
                    className='btn-action hangup fa fa-phone'
                    onClick={() => endCall(true)}
                />
                <button
                    type='button'
                    className='btn-action toggle-cam fa fa-phone'
                    onClick={() => toggleMediaDevice('cam')}
                />
            </div>
        </div>
    );
}

export default CallWindow;
