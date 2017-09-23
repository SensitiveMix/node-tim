'use strict'
const request = require('request')
const querystring = require('querystring')

class Request {
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
  invokeGeneric (method, api, params, callback) {
    if (typeof params === 'function') {
      callback = params
      params = {}
    }
    params || (params = {})

    const url = api.indexOf('/') === 0 ? `${this.protocol}://${this.host}${api}` : api
    const headers = params.headers ? params.headers : {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.accessToken ? params.accessToken : this.token}`
    }
    delete params.headers
    delete params.accessToken

    const options = { method, headers, url }

    if (method.toLowerCase() === 'get') options.qs = params
    else {
      if (params.form) {
        delete params.form
        options.form = params
	options.json = true
      } else if (params.formData) {
        delete params.formData
        options.formData = params
      } else {
        options.body = params
	options.json = true
      }

    }
    return new Promise((resolve, reject) => {
      request(options, (err, resp, body) => {
          if (err || resp && resp.statusCode > 399) {
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

module.exports = Request
