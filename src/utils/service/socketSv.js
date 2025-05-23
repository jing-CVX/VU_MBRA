import io_clt from "socket.io-client";
import { channels, glb_sv, eventList } from "../index";
import control_sv from "./controlSv";
import { environment } from "../../environments/environment.prod";

class SocketService {

    constructor() {

        this.RequestSeq = 0;
        this.key_MapReq = new Map();
        this.channels = channels;
        this.socket_clt = null;
        this.socket_sv_flag = false;
        this.socket_clt_conect_first = false;
        this.server_domain =environment.domain;
        this.sub_path = environment.sub_path;
        this.reAuthentimeout = null;

        this.getRqSeq = () => {
            return ++this.RequestSeq;
        };

        this.reConnectSocket = () => {
            this.setNewConnection();
        };

        this.send2Sv = (keyMsg, message) => {
            let newMsg = "";
            if (typeof message !== "string") {
                try {
                    newMsg = JSON.stringify(message);
                } catch (err) {
                    console.log("Error JSON.stringify: ", err);
                    return;
                }
            } else {
                newMsg = message;
            }
            this.socket_clt?.emit(keyMsg, newMsg);
            console.log("send2Sv", newMsg);
        };

        this.setNewConnection = () => {
            // Nếu đang kết nối rồi thì return và warning
            if (!this.server_domain || this.server_domain.length === 0) {
                console.log("Can not get domain info ", this.socket_clt?.connected);
                return;
            }
            if (this.socket_clt?.connected) {
                console.log(
                    "Log target: this.socket_clt?.connected",
                    this.socket_clt?.connected
                );
                return;
            }
            // Tạo một kết nối mới
            console.log("server_domain", this.server_domain,"sub_path", this.sub_path);
            let httpType = "http";
            httpType = this.server_domain?.substr(0, 5);
            this.socket_clt =
                httpType === "https"
                    ? io_clt(this.server_domain, {
                        path: this.sub_path,
                        timeout: 1000,
                        reconnection: false,
                    }) :
                    io_clt(this.server_domain, {
                        path: this.sub_path,
                        timeout: 1000,
                        reconnection: false,
                    });
            this.socket_StartListener(this.socket_clt);
            // -------------------- Log --------------------
            //--  send subcrible all topic
            // setTimeout(() => {
            //   const msg = { code: "SUB", topic: "#" };
            //   this.send2Sv(channels.SUB_REQUEST, msg);
            // }, 1000);
        };

        this.socket_StartListener = (socket) => {
            socket.on("connect", (data) => {
                glb_sv.authFlag = true
            });

            socket.on("connect_error", (data) => {
                console.log(" connect_error ", data);
                socket.destroy();
                // setTimeout(() => {
                    this.reConnectSocket();
                // }, 1000);
            });

            socket.on("disconnect", (data) => {
                socket.sendBuffer = [];
                // Gửi event reconnect socket
                // setTimeout(() => {
                    this.reConnectSocket();
                // }, 1000);
            });

            socket.on(channels.SEVER_RESULTRQ, (data) => {
                // this.event_ClientReqRcv.next(data)
                console.log("SEVER_RESULTRQ", data);
                const mssg = typeof data === "string" ? JSON.parse(data) : data;
                if (!mssg["client_seq"] || isNaN(mssg["client_seq"])) {
                    console.log("mssg -> mssg[client_seq]: ", mssg["client_seq"]);
                    return;
                }
                const cltSeqResult = Number(mssg["client_seq"]);
                const reqInfoMap = glb_sv.getReqInfoMapValue(cltSeqResult);
                if (!reqInfoMap) {
                    console.log("not found reqInfoMap", cltSeqResult);
                    return;
                }
                // return result from server to callback funtion
                if (reqInfoMap.receive_funct)
                    reqInfoMap.receive_funct(reqInfoMap, mssg);
                // Clear timeOut
                control_sv.clearTimeOutRequest(reqInfoMap.timeout_key);
                // Check expire token
                if (mssg["proc_code"] === "SYS007" || mssg["proc_code"] === "XXX4" || mssg["proc_code"] === "0XX1") {
                    //this.clearSession();
                    setTimeout(() => {
                        glb_sv.commonEvent.next({
                            type: eventList.EXPIRE_SESSION,
                            data: mssg,
                        });
                    }, 1500);
                }
            });

            //-- receive MQTT message then emit to other pages that subcrible
            socket.on(channels.SEVER_MQTT_MSG, (data) => {
                let mssg;
                console.log("SEVER_MQTT_MSG 1 -> data", data);
                if (typeof data === "string") {
                    mssg = JSON.parse(data);
                } else {
                    mssg = data;
                }
                glb_sv.commonEvent.next({ type: channels.SEVER_MQTT_MSG, data: mssg });
                console.log("SEVER_MQTT_MSG 2 -> data", data.topic, mssg);
            });
        };

        this.getStatus = () => {
            if (!this.socket_clt) return false;
            return this.socket_clt?.connected;
        };
    }
}

const theInstance = new SocketService();

export default theInstance;

