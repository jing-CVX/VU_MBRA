import glb_sv from "./globalSv";
import socket_sv from "./socketSv";
import control_sv from "./controlSv";
import requestInfo from "../models/requestInfo";
import inputPrmRq from "../models/inputPrmRq";
import channels from "../constant/channels";
export class IO {

    serviceName = '';

    sendRequest = (
        serviceInfo,//1
        input_params,//2
        handleResultFunc,//3
        isControltimeout = true,//4
        ontimeout,//5
        waitTime,//6
        serviceName = '',//8
        msg_tp = 1,//7
    ) => {
      //  console.log(socket_sv);
        //- luôn kiểm tra trạng thái socket kết nối tới server trước
        if (socket_sv.socket_clt?.connected==false) {
            // console.warn(
            //     "Mạng không ổn định, vui lòng thử lại sau: [ServiceInfo]:",
            //     serviceInfo,
            //     " [input_params]: ",
            //     input_params
            // );
            // // Nếu request có hàm time out thì cần phải xử lý ==> dể các state trở về trạng thái ban đầu
            if (ontimeout) ontimeout({ type: "not_network", input_params });
            return;
        }
        // Nếu không có thì gọi request
        const client_seq = socket_sv.getRqSeq();
        const svInputPrm = new inputPrmRq();
        this.serviceName = serviceName
        svInputPrm.client_seq = client_seq;
        svInputPrm.biz = serviceInfo.biz;
        svInputPrm.object = serviceInfo.object;
        svInputPrm.funct = serviceInfo.functNm;
        svInputPrm.input = input_params;
        svInputPrm.msg_tp = msg_tp;
        // -- push request to request hashmap
        const reqInfo = new requestInfo();
        reqInfo.req_funct =  serviceInfo.biz + "-" + serviceInfo.object + "-" + serviceInfo.functNm;
        reqInfo.input_param = svInputPrm.input;
        reqInfo.timeout_key = svInputPrm.funct + "|" + client_seq;
        reqInfo.receive_funct = handleResultFunc;
        glb_sv.setReqInfoMapValue(client_seq, reqInfo);
        socket_sv.send2Sv(channels.CLIENT_REQUEST, svInputPrm);
       // console.log("svInputPrm", svInputPrm);

    
        //-- start function to callback if timeout happened
        if (isControltimeout) {
            control_sv.ControltimeoutObj[reqInfo.timeout_key] = setTimeout(
                this.solving_timeout,
                waitTime > 0 ? waitTime : glb_sv.req_timeout,
                reqInfo.timeout_key,
                reqInfo.input_param,
                ontimeout,
                client_seq
            ,10);
        }
    };
    //-- xử lý khi timeout -> ko nhận được phản hồi từ server
    solving_timeout = (
        timeout_key,
        input_param,
        ontimeout,
        client_seq = 0,
    ) => {
        if (client_seq == null || client_seq === undefined || isNaN(client_seq)) {
            return;
        }
        const reqIfMap = glb_sv.getReqInfoMapValue(client_seq);
        if (reqIfMap == null || reqIfMap === undefined || reqIfMap.proc_stat !== 0) {
            return;
        }
        reqIfMap.res_time = new Date();
        reqIfMap.proc_stat = 4;
        glb_sv.setReqInfoMapValue(client_seq, reqIfMap);
        control_sv.clearTimeOutRequest(timeout_key);
        // Xử lý time out cho từng màn hình nếu có
        if (ontimeout) ontimeout({ type: "noReceiveFeedback", input_param , serviceName: this.serviceName  });
        // Clear luôn handleResultFunc để tránh lỗi khi server gửi response về sau khi đã timeout
        control_sv.clearReqInfoMapRequest(client_seq);
    };

}

const theInstance = new IO();

export default theInstance;
