import { Subject } from "rxjs";
import { eventList } from "../index";
import moment from "moment";
import dayjs from "dayjs";

class globalService {
  constructor() {
    this.reqInfoMap = new Map();
    this.commonEvent = new Subject();
    this.eventConnect = new Subject();
    this.authFlag = false;
    this.expTimeout = 900; // -- time idle
    this.discexpire = 30; // -- time expire tính từ thời điểm mất kết nối server
    this.reqTimeout = 15000; // 15 seconds
    this.versionChange = "1.0.0";
    this.errorInfo = null;
    this.uploadtImg = "";
    this.defaultImg = "";
    // this.prodImgPath = ''
    this.urlPostImg = "uplimgprod";
    this.configInfo = {};
    this.toastYN = [];
    this.timeServer = dayjs().format("YYYYMMDD");
    this.language = "vi";
    this.timeoutConnect = "timeout_30m";
    this.hotKeys = {};
    //---------------------------------------------
    this.isInternetReachable = true;
    this.networkState = {}; // trạng thái mạng (không realtime)
    this.sessionInfo = {
      user_id: "",
      account: "",
      token: "",
      user_name: "",
      user_email: "",
      user_phone: "",
      avatar:""
    };

    this.tabbarName = "HOMEPAGE";
    this.isConnectApp = true;
    /**
     * @param {String} notifyOnesignal chứa userId và pushToken của onesignal
     */
    this.notifyOnesignal = {
      userId: "",
      pushToken: "",
    };
    /**
     * @param {String} userInfo chứa email, phone, name của user từ social
     */
    this.userInfo = {};
    /**
     * @param {String} credentials chứa thông tin khi tạo tài khoản
     */
    this.credentials = {
      username: "",
      password: "",
    };
    /**
     * @param {String} isAutoLogin flag check có phải auto login hay không
     */
    this.isAutoLogin = false;

    // -------------------------------------------
    this.setReqInfoMapValue = (key = 0, valObj = {}) => {
      this.reqInfoMap.set(key, valObj);
    };
    this.getReqInfoMapValue = (key) => {
      return this.reqInfoMap.get(key);
    };
    this.convUnixTime2StrDt = (unixTm, DateTp) => {
      const x = new Date(unixTm * 1000);
      const y = x.getFullYear();
      const m = x.getMonth() + 1;
      const sm = ("0" + m).slice(-2);
      const d = x.getDate();
      const sd = ("0" + d).slice(-2);
      let result = y + "" + sm + "" + sd;
      if (DateTp === 2) {
        const hours = "0" + x.getHours();
        const minutes = "0" + x.getMinutes();
        const seconds = "0" + x.getSeconds();
        result =
          result +
          "" +
          hours.substr(-2) +
          "" +
          minutes.substr(-2) +
          "" +
          seconds.substr(-2);
      }
      return result;
    };
    this.convStrDt2UnixTime = (strTime) => {
      try {
        const y = Number(strTime.substr(0, 4));
        const m = Number(strTime.substr(4, 2)) - 1;
        const d = Number(strTime.substr(6, 2));
        const dates = new Date(y, m, d, 15, 0, 0);
        const unixtime = dates.getTime() / 1000;
        // const unixtime = Number(dates.toISOString())
        return unixtime;
      } catch (error) {
        // this.logMessage('Error at convStrDt2UnixTime: ' + error);
        return -1;
      }
    };
    this.convStrDtime2UnixTime = (strTime) => {
      try {
        //example: strTime = 2020 05 22 10 01 02
        const y = Number(strTime.substr(0, 4));
        const m = Number(strTime.substr(4, 2)) - 1;
        const d = Number(strTime.substr(6, 2));
        const h = Number(strTime.substr(8, 2));
        const mi = Number(strTime.substr(10, 2));
        const s = Number(strTime.substr(12, 2));
        const dates = new Date(y, m, d, h, mi, s);
        const unixtime = dates.getTime() / 1000;
        return unixtime;
      } catch (error) {
        // this.logMessage('Error at convStrDt2UnixTime: ' + error);
        return -1;
      }
    };

    this.convDate2StrDt = (Datt) => {
      const y2 = Datt.getFullYear();
      const m2 = Datt.getMonth() + 1;
      const sm = ("0" + m2).slice(-2);
      const d2 = Datt.getDate();
      const sd = ("0" + d2).slice(-2);
      const result = y2 + "" + sm + "" + sd;
      return result;
    };

    this.filterStrBfParse = (str) => {
      if (!str || str === undefined) return "";
      let result = "",
        i = 0;
      for (i = 0; i < str.length; i++) {
        let tt = str.substr(i, 1);
        const ascII = tt.charCodeAt(0);
        if (ascII <= 31) {
          tt = "";
        }
        if (ascII === 4) {
          tt = "'|'";
        } // -- EOT
        result = result + tt;
      }
      return result;
    };

    this.logMessage = (flag = false, ...message) => {
      if (flag) {
        const now = new Date();
        // console.log(
        //   `Time: ${now.toLocaleTimeString()}.${now.getMilliseconds()}>`,
        //   ...message
        // );
      }
      return;
    };

    this.filterNumber = (numberstr) => {
      if (typeof numberstr === "number") return numberstr;
      else if (numberstr != null && numberstr.length > 0) {
        return Number(numberstr.replace(/\D/g, ""));
      }
    };

    this.addZero = (x, n) => {
      while (x.toString().length < n) {
        x = "0" + x;
      }
      return x;
    };

    this.convDate2StrTime = (Datt) => {
      const y2 = Datt.getFullYear();
      const m2 = Datt.getMonth() + 1;
      const sm = ("0" + m2).slice(-2);
      const d2 = Datt.getDate();
      const sd = ("0" + d2).slice(-2);
      const hr = Datt.getHours() + 1;
      const hrs = ("0" + hr).slice(-2);
      const mi = Datt.getMinutes() + 1;
      const mis = ("0" + mi).slice(-2);
      const ss = Datt.getSeconds() + 1;
      const sss = ("0" + ss).slice(-2);
      const result = y2 + "" + sm + "" + sd + "" + hrs + "" + mis + "" + sss;
      return result;
    };

    this.dateToChartTimeMinute = (date) => {
      return (
        Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          0
        ) / 1000
      );
    };
    this.convertUTCDateToLocalDate = (date) => {
      var newDate = new Date(
        date.getTime() + date.getTimezoneOffset() * 60 * 1000
      );

      var offset = date.getTimezoneOffset() / 60;
      var hours = date.getHours();

      newDate.setHours(hours + offset);

      return newDate;
    };
    this.versionCompare = (v1, v2, options) => {
      var lexicographical = options && options.lexicographical,
        zeroExtend = options && options.zeroExtend,
        v1parts = v1.split("."),
        v2parts = v2.split(".");

      function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
      }

      if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
      }

      if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push("0");
        while (v2parts.length < v1parts.length) v2parts.push("0");
      }

      if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
      }

      for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length === i) {
          return 1;
        }

        if (v1parts[i] === v2parts[i]) {
          continue;
        } else if (v1parts[i] > v2parts[i]) {
          return 1;
        } else {
          return -1;
        }
      }

      if (v1parts.length !== v2parts.length) {
        return -1;
      }

      return 0;
    };

    this.arr_diff = (a1, a2) => {
      const a = [],
        diff = [];

      for (let i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
      }

      for (let i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
          delete a[a2[i]];
        } else {
          a[a2[i]] = true;
        }
      }

      for (let k in a) {
        diff.push(k);
      }

      return diff;
    };

    this.intersect = (arr1, arr2) => {
      const result = [];
      for (let i = 0; i < arr1.length; i++) {
        if (arr2.indexOf(arr1[i]) === -1) result.push(arr1[i]);
      }
      return result;
    };

    this.showAlert = (params) => {
      this.commonEvent.next({ type: eventList.ALERT_MODAL, params });
    };

    this.focusInput = (id, sleep) => {
      if (sleep) {
        setTimeout(() => {
          const ele = document.getElementById(id);
          if (ele) ele.focus();
        }, sleep);
      } else {
        const ele = document.getElementById(id);
        if (ele) ele.focus();
      }
    };

    this.getRandomArbitrary = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.validateEmail = (email) => {
      const expression =
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return expression.test(email.toLowerCase());
    };

    this.verifyDt = (dt, month, year) => {
      if (!dt || !month || !year || isNaN(dt) || isNaN(month) || isNaN(year))
        return false;
      let varDt, varMonth, varYear;
      varDt = Number(dt) < 10 ? "0" + dt : "" + dt;
      varMonth = Number(month) < 10 ? "0" + month : "" + month;
      varYear = "" + year;
      let date = moment(varYear + "-" + varMonth + "-" + varDt);
      if (!date.isValid) return false;
      return true;
    };

    this.formatDate = (value, formatIn, formatOut) => {
      if (!value || value === "" || value === null) return "";
      let date = moment(value, formatIn || "DDMMYYYYHHmmss").format(
        formatOut ? formatOut : "DD/MM/YYYY HH:mm:ss"
      );
      if (date === "Invalid Date") return "";
      return date;
    };

    // ---- Nhóm các đối tượng của mảng theo một thuộc tính
    this.groupBy = (objectArray, property) => {
      return objectArray.reduce(function (accumulator, obj) {
        let key = obj[property];
        if (!accumulator[key]) {
          accumulator[key] = [];
        }
        accumulator[key].push(obj);
        return accumulator;
      }, {});
    };
  }
}
const theInstance = new globalService();
export default theInstance;
