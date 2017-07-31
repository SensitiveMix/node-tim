'use strict'
const request = require('request')
const querystring = require('querystring')

class Tim {
  constructor (token, config = {}) {
    this.token = token
    this.protocol = config.protocol || 'https'
    this.host = config.host || 'api.teambition.com'
  }

  /**
   * generic request
   * @param method
   * @param apiURL
   * @param params
   * @param callback
   * @returns {Promise}
   */
  invokeGeneric (method, apiURL, params, callback) {
    let headers = {}
    if (typeof params === 'function') {
      callback = params
      params = {}
    }

    params || (params = {})
    if (apiURL.indexOf('/') === 0) {
      apiURL = `${this.protocol}://${this.host}${apiURL}`
    }
    headers = {
      'Content-Type': 'application/json'
    }
    if (this.token) {
      headers['Authorization'] = 'Bearer ' + this.token
    }
    if (params.headers) {
      headers = params.headers
      delete params.headers
    }
    let options = {
      method: method,
      headers: headers,
      url: apiURL,
      json: true
    }
    if (method.toLowerCase() !== 'get') {
      options.form = params
    } else {
      options.qs = params
    }
    return new Promise((resolve, reject) => {
      request(options, (err, resp, body) => {
          if (err || resp && resp.statusCode !== 200) {
            err || (err = body)
          }
          if (typeof callback === 'function') {
            resolve(callback(err, body))
          } else {
            if (err) reject(err)
            resolve(body)
          }
        }
      )
    })
  }

  api (apiURL, params, callback) {
    return this.invokeGeneric('GET', apiURL, params, callback)
  }

  get () {
    return this.api.apply(this, arguments)
  }

  post (apiURL, params, callback) {
    return this.invokeGeneric('POST', apiURL, params, callback)
  }

  put (apiURL, params, callback) {
    return this.invokeGeneric('PUT', apiURL, params, callback)
  }

  del (apiURL, params, callback) {
    return this.invokeGeneric('DELETE', apiURL, params, callback)
  }
}

module.exports = Tim
