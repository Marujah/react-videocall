import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Configuration } from '../models/Configuration';

interface Props {
  status: string;
  callFrom: string;
  startCall(state: boolean, callFrom: string, config: Configuration): void;
  rejectCall(): void;
  toggleCam(): void;
}

const CallModal: React.FunctionComponent<Props> = ({
  status,
  callFrom,
  startCall,
  rejectCall,
  toggleCam
}) => {
  const acceptWithVideo = (video) => {
    const config = { audio: true, video };
    return () => startCall(false, callFrom, config);
  };

  return (
    <div className={classnames('call-modal', status)}>
      <p>
        <span className="caller">{`${callFrom} is calling`}</span>
      </p>
      <button
        type="button"
        className="btn-action fa fa-video-camera"
        onClick={acceptWithVideo(true)}
      />
      <button
        type="button"
        className="btn-action fa fa-phone"
        onClick={acceptWithVideo(false)}
      />
      <button
        type="button"
        className="btn-action hangup fa fa-phone"
        onClick={rejectCall}
      />
      <button
        type="button"
        className="btn-action hangup fa fa-phone"
        onClick={toggleCam}
      />
    </div>
  );
}

export default CallModal;
