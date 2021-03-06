import axios from 'axios'
import * as api from './api'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:5002'
// 解决浏览器无法保存 set-cookies 的问题
axios.defaults.withCredentials = true

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/json'
    }

    return config
  },
  // eslint-disable-next-line handle-callback-err
  error => {
    // eslint-disable-next-line no-undef
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.status === 2) {
      window.location.href = '#/login'
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function remove(url) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {})
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

export default api
