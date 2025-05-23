import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import { Subject } from "rxjs";
import { Linking } from "react-native";
import { glb_sv } from "./utils";

export class IOGlobal {
  socket = null;

  _infoStore = null;

  response = new Subject();

  result = this.response.asObservable();

  // domain = "https://windyerp-dev.chips.com.vn/";

  domain ="https://skm-dev.chips.com.vn/";
  path = "/skm_sv/";

  ini() {
    if (!this.socket && this.socket == null) {
      this.socket = io(this.domain, {
        rejectUnauthorized: false,
        path: this.path,
      });

      this.socket.on("connect", (data) => {
        // console.log('connect at Time: ' + Date());
        // console.log('connect', this.socket.io.engine.transport.name);
        this.listener();
      });
    }
  }

  listener() {
    // this.socket.on("client", (response) => {
    //   this.response.next(response);
    // });

    this.socket.on("CLIENT_REQUEST", (response) => {
      this.response.next(response);
    });
    this.socket.on("connect_timeout", (response) => {});
    this.socket.on("connect_error", (response) => {
        //  console.log('connect_error => Time: ' + Date());
        //  console.log(response);
    });
    this.socket.on("disconnect", (response) => {
       //    console.log(response);
    });
  }

  send(option) {
    if (option.token) {
      if (option.client) {
        let response = {
          status: 1,
          token: option.token,
          data: option.data,
          message: null,
        };
        this.response.next(response);
      } else {
        // option['authentication'] = this._infoStore;
        option["authentication"] = glb_sv.sessionInfo;
       //   console.log(option);
        if (this.socket) {
          this.socket.emit("server", option);
        }
      }
    }
  }

  USERS = {
    tokenCheckLogin: "browsersIndexChecklogin",
    _checkLogin: async () => {
      this._infoStore = await this.USERS.info.get();
      this.send({ token: this.USERS.tokenCheckLogin, data: this._infoStore });
    },
    _getCircularReplacer: () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    },
    token: {
      key: "userToken",
      set: async (token) => {
        try {
          await AsyncStorage.setItem(this.USERS.token.key, token);
        } catch (error) {
          //      console.log(error);
        }
      },
      remove: async () => {
        const result = await AsyncStorage.removeItem(this.USERS.token.key);
        return result;
      },
      get: async () => {
        try {
          const value = await AsyncStorage.getItem(this.USERS.token.key);
          if (value !== null) {
            return value;
          }
        } catch (error) {
          //       console.log(error);
        }
      },
    },
    info: {
      key: "localStorage",
      set: async (data) => {
        this._infoStore = data;
        data =
          typeof data === "object"
            ? JSON.stringify(data, this.USERS._getCircularReplacer())
            : data;
        try {
          await AsyncStorage.setItem(this.USERS.info.key, data);
        } catch (error) {
          //       console.log(error);
        }
      },
      remove: async () => {
        const result = await AsyncStorage.removeItem(this.USERS.info.key);
        this._infoStore = {};
        return result;
      },
      get: async () => {
        try {
          if (await AsyncStorage.getItem(this.USERS.info.key)) {
            let data = await AsyncStorage.getItem(this.USERS.info.key);
            return JSON.parse(data);
          } else {
            return {};
          }
        } catch (error) {
          return {};
        }
      },
      check: async () => {
        return (await AsyncStorage.getItem(this.USERS.info.key)) &&
          (await AsyncStorage.getItem(this.USERS.token.key))
          ? true
          : false;
      },
      setInfoStore: async () => {
        this._infoStore = await this.USERS.info.get();
      },
    },
  };
  _downloadFile(item) {
    Linking.openURL(item.file_path);
  }
}

const IO = new IOGlobal();

export default IO;
