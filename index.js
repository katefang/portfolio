const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cors());
app.listen(port, () => {
  console.log('We are live on port 5000');
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/api/v1', (req, res) => {
  var data = req.body;
  var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: '(username)',
      pass: '(password)'
    }
  });
  var mailOptions = {
    from: data.email,
    to: '(email to send to)',
    subject: 'Portfolio Contact Form',
    html: `<p>${data.name}</p>
          <p>${data.email}</p>
          <p>${data.comments}</p>`
  };
  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send('Success');
    }
    smtpTransport.close();
  });
});
