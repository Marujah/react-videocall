import React, { Component, useState, useEffect } from 'react';
import socket from '../utils/socket';
import PeerConnection from '../utils/PeerConnection';
import MainWindow from './MainWindow';
import CallWindow from './CallWindow';
import CallModal from './CallModal';

interface Props {};

const App: React.FunctionComponent<Props> = () => {
  
  const [clientId, setClientId] = useState('');
  const [callWindow, setCallWindow] = useState('');
  const [callModal, setCallModal] = useState('');
  const [callFrom, setCallFrom] = useState('');
  const [localSrc, setLocalSrc] = useState(null);
  const [peerSrc, setPeerSrc] = useState(null);
  const [frontCam, setFrontCam] = useState(true);

  useEffect(() => {
    socket
      .on('init', ({ id: clientId }) => {
        document.title = `${clientId} - VideoCall`;
        setClientId(clientId);
      })
      .on('request', ({ from: callFrom }) => {
        setCallModal('active');
        setCallFrom(callFrom);
      })
      .on('call', (data) => {
        if (data.sdp) {
          this.pc.setRemoteDescription(data.sdp);
          if (data.sdp.type === 'offer') this.pc.createAnswer();
        } else this.pc.addIceCandidate(data.candidate);
      })
      .on('end', endCall(false))
      .emit('init');
  }, []);

  const startCall = (isCaller, friendID, config) => {
    this.config = config;
    this.pc = new PeerConnection(friendID)
      .on('localStream', (src) => {
        const newState = { callWindow: 'active', localSrc: src };
        if (!isCaller) setCallModal('');
        setCallWindow('active');
        setLocalSrc(src);        
      })
      .on('peerStream', (src) => setPeerSrc(src))
      .start(isCaller, config);
  }

  const rejectCall = () => {
    const { callFrom } = this.state;
    socket.emit('end', { to: callFrom });
    setCallModal('');
  }

  const endCall = (isStarter) => {
    if (this.pc && this.pc.stop && typeof this.pc.stop === 'function') {
      this.pc.stop(isStarter);
    }
    this.pc = {};
    this.config = null;
    setCallWindow('');
    setCallModal('');
    setLocalSrc(null);
    setPeerSrc(null);
  }

  const toggleCam = () => {
    setFrontCam(!frontCam);
  }

    return (
      <div>
        <MainWindow
          clientId={clientId}
          startCall={startCall}
        />
        {this.config && (
          <CallWindow
            status={callWindow}
            localSrc={localSrc}
            peerSrc={peerSrc}
            config={this.config}
            mediaDevice={this.pc.mediaDevice}
            endCall={endCall}
          />
        ) }
        <CallModal
          status={callModal}
          startCall={startCall}
          rejectCall={rejectCall}
          callFrom={callFrom}
          toggleCam={this.toggleCam}
        />
      </div>
    );
};

export default App;
