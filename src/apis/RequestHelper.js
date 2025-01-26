import axios from "axios";

export default class RequestHelper {
  static EDUCITY_BASE_URL = process.env.REACT_APP_API_URL;
  static _educity = null;

  static get educity() {
    if (!this._educity) {
      this._educity = axios.create({
        baseURL: this.EDUCITY_BASE_URL,
      });
    }

    return this._educity;
  }
}
