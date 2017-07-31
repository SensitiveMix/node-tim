const Tim = require('../lib/index')
let accessToken = 'tim accessToken'

let tim = new Tim(accessToken)

// callback
tim.get('/users/me', (err, data) => {
  // user's profile
  if (err) throw err
  console.log(data)
})

// promise
tim
  .get('/users/me')
  .then(userprofile => console.log(userprofile))
  .catch(err => console.log(err))
