```bash
                      __                __     _             
   ____   ____   ____/ /  ___          / /_   (_)   ____ ___ 
  / __ \ / __ \ / __  /  / _ \ ______ / __/  / /   / __ `__ \
 / / / // /_/ // /_/ /  /  __//_____// /_   / /   / / / / / /
/_/ /_/ \____/ \__,_/   \___/        \__/  /_/   /_/ /_/ /_/ 
                                                             

```
node sdk for Tim

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/SensitiveMix/node-tim.svg?branch=master)](https://travis-ci.org/SensitiveMix/node-tim)

## Installation
```
yarn add node-tim
```

## Options
Initialize Tim plugin with the given options.

```JavaScript
Tim(access_token, { host: "", protocol: "" })
```
Options:

 - `access_token` 用户通过Teambition Account授权获取到的token, 用于验证请求是否合法并经过用户授权
 - `host` 非必需参数, 指定API地址s


## Usage

* callback
```JavaScript
let accessToken = 'Tim accessToken'
let tim = new Tim(accessToken)

tim.get('/users/me', (err, data) => {
  // user's profile
  if (err) throw err
  console.log(data)
})

```

* promise
```JavaScript
let accessToken = 'Tim accessToken'
let tim = new Tim(accessToken)
tim
  .get('/users/me')
  .then(userprofile => console.log(userprofile))
  .catch(err => console.error(err))
```

## License

ISC License

Copyright (c) 2017
