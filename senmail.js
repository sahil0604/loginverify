var nodemailer = require('nodemailer');
var senemail = function(password,email) {
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sahil.shaikh@kbpcoes.edu.in',
    pass: 'sikander786'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: email,
  subject: 'Sending Email using Node.js',
  text: 'your password is '+ password
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 
}
module.exports.senemail = senemail;