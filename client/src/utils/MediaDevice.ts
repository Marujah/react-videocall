import Emitter from './Emitter';
import { Configuration } from '../models/Configuration';

/**
 * Manage all media devices
 */
class MediaDevice extends Emitter {
  stream: MediaStream;
  /**
   * Start media devices and send stream
   */

  start(config: Configuration) {
    const constraints = {
      video: {
        facingMode: 'envirement' || 'user',
        height: { min: 360, ideal: 720, max: 1080 }
      },
      audio: true
    };


    navigator.mediaDevices.getUserMedia(constraints)
      .then((strm) => {
        this.stream = strm;
        this.emit('stream', strm);
      }).catch((err) => {
        if (err instanceof DOMException) {
          alert('Cannot open webcam and/or microphone');
        } else {
          console.log(err);
        }
      });
    return this;
  };

  // emit(arg0: string, strm: MediaStream) {
  //   throw new Error("Method not implemented.");
  // }

  /**
   * Turn on/off a device
   * @param {String} type - Type of the device
   * @param {Boolean} [on] - State of the device
   */
  toggle(type, on) {
    const len = arguments.length;
    if (this.stream) {
      this.stream[`get${type}Tracks`]().forEach((track) => {
        const state = len === 2 ? on : !track.enabled;
        track = {...track, enabled: state};
      });
    }
    return this;
  }

  /**
   * Stop all media track of devices
   */
  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    return this;
  }
}

export default MediaDevice;
