import axios from "axios";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const ACCESS_TOKEN: string = "accessToken";
export const USER_LOGIN: string = "userLogin";

export const DOMAIN = "https://shop.cyberlearn.vn";
export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});

export const settings = {
  setStorageJson: (name: string, data: any): void => {
    data = JSON.stringify(data);
    localStorage.setItem(name, data);
  },
  setStorage: (name: string, data: string): void => {
    localStorage.setItem(name, data);
  },
  getStorageJson: (name: string): any | undefined => {
    if (localStorage.getItem(name)) {
      const dataStore: string | undefined | null = localStorage.getItem(name);
      if (typeof dataStore == "string") {
        const data = JSON.parse(dataStore);
        return data;
      }
      return undefined;
    }
    return; //undefined
  },
  getStore: (name: string): string | null | undefined | boolean | any => {
    if (localStorage.getItem(name)) {
      const data: string | null | undefined = localStorage.getItem(name);
      return data;
    }
    return; //undefined
  },
  setCookieJson: (name: string, value: any, days: number): void => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    value = JSON.stringify(value);
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookieJson: (name: string): any => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0)
        return JSON.parse(c.substring(nameEQ.length, c.length));
    }
    return null;
  },
  setCookie: (name: string, value: string, days: number): void => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: (name: string): string | null => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  eraseCookie: (name: string): void => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },
  clearStorage: (name: string) => {
    localStorage.removeItem(name);
  },
};

// cau hinh cho tat ca request gui di
// http.interceptors
http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: "Bearer " + settings.getStore(ACCESS_TOKEN),
    };
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// cau hinh cho tat ca ket qua tra ve (cau hinh response)
http.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    //H??m c???u h??nh cho t???t c??? l???i nh???n v???
    if (error.response?.status === 400 || error.response?.status === 404) {
      //Chuy???n h?????ng trang v??? trang ch???
      history.push("/");
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      history.push("/login");
    }

    return Promise.reject(error);
  }
);
/* C??c status code th?????ng g???p
    200: Request g???i ??i v?? nh???n v??? k???t qu??? th??nh
    201: request g???i ??i th??nh c??ng v?? ???? ???????c kh???i t???o 
    400: bad request => request g???i ??i th??nh c??ng tuy nhi??n kh??ng t??m th???y d??? li???u t??? tham s??? g???i ??i
    404: Not found (Kh??ng t??m th???y api ????), ho???c t????ng t??? 400
    401: Unauthorize token kh??ng h???p l??? kh??ng c?? quy???n truy c???p v??o api ????
    403: Forbinden token h???p l??? tuy nhi??n ch??a ????? quy???n ????? truy c???p v??o api ????
    500: Error server (L???i x???y ra tr??n server c?? kh??? n??ng l?? frontend g???i d??? li???u ch??a h???p l??? d???n ?????n backend x??? l?? b??? l???i). Backend code l???i tr??n server ! => Test b???ng post man ho???c swagger n???u api kh??ng l???i => front code sai, ng?????c l???i tail fail tr??n post man v?? swagger th?? b??o backend fix.
*/
