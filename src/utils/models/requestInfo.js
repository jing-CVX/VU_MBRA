export default class requestInfo {
  constructor() {
    this.req_time = new Date(); //-- Thời gian khi cient gửi request
    this.res_time = new Date(); //-- Thời gian khi nhận được phản hồi từ server
    this.req_funct = null; //-- Tên function chức năng
    this.receive_funct = null; // handle respone request
    this.proc_stat = 0; //-- 0 - Chưa nhận được phản hồi từ server;
    // 1 - đã nhận nhưng chưa hoàn tất (trong trường hợp server trả dữ liệu làm nhiều lần mà client chưa nhận được gói cuối cùng)
    // 2 - đã nhận hoàn tất (gói dữ liệu cuối cùng, lúc này server trả về: message["PACKAGE_END"] == true)
    // 4 - trạng thái đánh dấu cho biết request này bị timeout
    this.res_succ = true; // -- Kết quả server xử lý yêu cầu thành công hay thất bại
    this.input_param = []; //-- Ghi nhận lại tham số input được gửi xuống server
    this.timeout_key = ""; // Key - Để xóa hàm timeout khi nhận được phản hồi từ server
  }
}
