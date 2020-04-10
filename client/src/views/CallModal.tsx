import React from 'react';
import classnames from 'classnames';
import { Configuration } from '../models/Configuration';
import videoIcon from '../images/video-camera.svg';
import phoneIcon from '../images/phone.svg';
import hangUpIcon from '../images/phone-hang-up.svg';

interface Props {
    status: string;
    callFrom: string;
    startCall(state: boolean, callFrom: string, config: Configuration): void;
    rejectCall(): void;
}

const CallModal: React.FunctionComponent<Props> = ({
    status,
    callFrom,
    startCall,
    rejectCall,
}) => {
    const acceptWithVideo = (video) => {
        const config = { audio: true, video };
        return () => startCall(false, callFrom, config);
    };

    return (
        <div className={classnames('call-modal', status) + ' p-4 flex flex-col items-center justify-center'}>
            <span className='caller'>{`${callFrom} is calling`}</span>
            <div>
                <button
                    type='button'
                    className='bg-none border-none cursor-pointer round-icon icon-on mr-4'
                    onClick={acceptWithVideo(true)}
                >
                    <img alt='video' src={videoIcon} />
                </button>
                <button
                    type='button'
                    className='bg-none border-none cursor-pointer round-icon icon-on mr-4'
                    onClick={acceptWithVideo(false)}
                >
                    <img alt='video' src={phoneIcon} />
                </button>
                <button
                    type='button'
                    className='bg-none border-none cursor-pointer round-icon icon-off'
                    onClick={rejectCall}
                >
                    <img alt='hang up' src={hangUpIcon} />
                </button>
            </div>
        </div>
    );
}

export default CallModal;
