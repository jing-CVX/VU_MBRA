/**
 * Defined all chanel for socket client comunication with socket server
 */
export default {
  //-- for client send old token right after re connect
  //-- Nhận dữ liệu MQTT broker
  SEVER_MQTT_MSG: "SEVER_MQTT_MSG",
  //-- Gửi request SUB/UNSUB tới server
  SUB_REQUEST: "SUB_REQUEST",
  //-- Nhận phản hồi của server cho một request SUB/UNSUB
  SUB_RESULTRQ: "SUB_RESULTRQ",
  //-- Gửi request một yêu cầu (service) tới server
  CLIENT_REQUEST: "CLIENT_REQUEST",
  //-- Nhận phản hồi của server cho một request thông thường
  SEVER_RESULTRQ: "SEVER_RESULTRQ",
};
