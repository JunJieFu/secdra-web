/**
 * http请求的工具类
 *
 * @author fjj
 */
import Cookies from 'js-cookie'
import {Result} from "../model"
import axios from "axios"
import qs from "qs"
// import * as NProgress from "nprogress";
axios.defaults.baseURL = process.env.baseUrl;
export default {
  /**
   * get 请求
   * @param {string} url
   * @param params
   * @returns {Promise<>}
   */
  async get(url, params) {
    let result = null;
    try {
      let response = await axios.get(url, {
        params: params
      });
      this._handleToken(response);
      result = response.data;
    } catch (e) {
      result = await new Result(500, e, "服务器错误");
    } finally {

    }
    return result;
  },

  /**
   * post 请求
   * @param {string} url
   * @param body
   * @param params
   * @returns {Promise<>}
   */
  async post(url, body, params) {
    let result = null;
    try {
      let response = await axios.post(url, qs.stringify(body, {
        arrayFormat: 'repeat'
      }), {
        params: params
      });
      this._handleToken(response);
      result = response.data;
    } catch (e) {
      result = await new Result(500, e, "服务器错误");
    } finally {

    }
    return result;
  },

  _getCookieToken() {
    if (window.$nuxt.$store.state.user.token) {
      return window.$nuxt.$store.state.user.token
    } else {
      try {
        return Cookies.get('token');
      } catch (e) {
        return null
      }
    }
  },
  _handleToken(response = {}) {
    let headers = response.headers || {};
    if (headers.token) {
      Cookies.set("token", headers.token, {expires: 30})
    }
    if (response.data.status === 401) {
      Cookies.remove("token");
      try {
        window.$nuxt.$router.replace("/login")
      } catch (e) {
        window.location.href = "/login";
      }
    }
  }
}
