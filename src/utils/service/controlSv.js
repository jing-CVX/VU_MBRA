import glb_sv from "./globalSv";

class ControlService {
  constructor() {
    this.ControltimeoutObj = {};

    this.clearTimeOutRequest = (timeout_key) => {
      if (this.ControltimeoutObj[timeout_key])
        clearTimeout(this.ControltimeoutObj[timeout_key]);
      delete this.ControltimeoutObj[timeout_key];
      return;
    };
    this.clearReqInfoMapRequest = (client_seq) => {
      glb_sv.setReqInfoMapValue(client_seq, null);
      return;
    };
  }
}

const theInstance = new ControlService();
export default theInstance;
