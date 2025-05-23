import glb_sv from "../service/globalSv";
export default class inputPrmRq {
  constructor() {
    this.comp_id = glb_sv.sessionInfo.comp_id || 0; //-- AA = 100
    this.branch_id = glb_sv.sessionInfo.branch_id || 0;
    this.user_id = glb_sv.sessionInfo.user_id || 9999999999; // -- userId
    this.user_nm = glb_sv.sessionInfo.email || 'system'
    this.token = glb_sv.sessionInfo.token || '';
    // this.token = 'Cq5m1D2p6z7ZpM42cu2mdl1D6A2!1-test'; // -- dev
    this.timeout = 15;
    this.lang = glb_sv.language;
    this.client_seq = 0;
    // this.clientChanel = '01' //-- web client, 02 mobile web client, 03 android + ios app
    this.client_tp = "01"; // # 01 mobile android, 02 mobile iso, 03 mobile web, 04 website, 05 desktop app
    this.client_sent_time = new Date();
    this.msg_tp = 1; //-- 0: -> request to IOT device, 1: request to process logic at server
    this.biz = "";
    this.object = "";
    this.funct = ""; //-- if it's request to IOT device => funct = topic
    this.input = [];
   // this.token =glb_sv.sessionInfo.token || '';
  }
}
