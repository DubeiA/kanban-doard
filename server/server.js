const express = require('express');
const cors = require('cors');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const bodyParser = require('body-parser');

const CLIENT_ID = '5b578c8c0d177a310fe7';
const CLIENT_SECRET = 'e25835cb31ca4f523f3ede15004a2494ae40c6d7';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res) {
  console.log(req.query.code);

  const params =
    '?client_id=' +
    CLIENT_ID +
    '&client_secret=' +
    CLIENT_SECRET +
    '&code=' +
    req.query.code;

  await fetch('http://github.com/login/oauth/access_token' + params, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('POST', data);
      res.json(data);
    });
});

// app.get('/getUserData', async function (req, res) {
//   req.get('Authorization');

//   await fetch('https://api.github.com/repos/facebook/react/issues', {
//     method: 'GET',
//     headers: {
//       Authorization: req.get('Authorization'),
//     },
//   })
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       console.log('GET', data);
//       res.json(data);
//     });
// });

app.listen(4000, function () {
  console.log('Cors server running on port 4000');
});
