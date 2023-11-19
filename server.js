const express = require('express');
const app = express();
const fs = require('fs');
const hostname = 'localhost';
const port = 3001;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/img/');
  },

  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "learning_system"
})

con.connect(err => {
  if (err) throw (err);
  else {
    console.log("MySQL connected");
  }
})

const queryDB = (sql) => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result, fields) => {
      if (err) reject(err);
      else
        resolve(result)
    })
  })
}

app.post('/regisDB', async (req, res) => {
  let sql = `Select User_Username from userInfo`;
  let result = await queryDB(sql)
  result = Object.assign({}, result);
  var keys = Object.keys(result);
  var check = false;
  for (var user_num = 0; user_num < keys.length; user_num++) {
    if (req.body.password == req.body.confirm_password && req.body.username !== result[keys[user_num]].User_Username) {
      let now_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
      let sql = "CREATE TABLE IF NOT EXISTS userInfo (id INT AUTO_INCREMENT PRIMARY KEY, User_Date TIMESTAMP, User_Name VARCHAR(300), User_Email VARCHAR(300), User_Username VARCHAR(300), User_Password VARCHAR(300))";
      let result = await queryDB(sql);
      sql = `INSERT INTO userInfo (User_Date, User_Name, User_Email, User_Username, User_Password) VALUES ("${now_date}","${req.body.name}","${req.body.email}","${req.body.username}", "${req.body.password}")`;
      result = await queryDB(sql);
      check = true;
      return res.redirect('html/login.html');
    }
  }
  if (check == false) {
    return res.redirect('html/register.html?error = 1');
  }
})

app.post('/CheckLogin', async (req, res) => {
  let sql = `Select User_Username, User_Password from userInfo`;
  let result = await queryDB(sql);
  result = Object.assign({}, result);
  var keys = Object.keys(result);
  var check = false;

  for (var counter = 0; counter < keys.length; counter++) {
    if (req.body.username == result[keys[counter]].User_Username &&
      req.body.password == result[keys[counter]].User_Password) {
      var check = true;
      res.cookie("username", result[keys[counter]].User_Username);
      res.cookie("password", result[keys[counter]].User_Password);
      return res.redirect('html/index.html');
    }
  }

  if (check == false) {
    check = false;
    return res.redirect('html/login.html?error = 1');
  }

})

app.post('/UpdateDB', async (req, res) => {
  let sql = `Select User_Username from userInfo`;
  let result = await queryDB(sql);
  result = Object.assign({}, result);
  var keys = Object.keys(result);
  var check = false;
  for (var information_num = 0; information_num < keys.length; information_num++) {
    if (req.body.username == result[keys[information_num]].User_Username &&
      req.body.password == req.body.confirm_password) {
      let sql = `UPDATE userInfo SET User_Password = '${req.body.password}' WHERE User_Username = '${req.body.username}'`;
      let result = await queryDB(sql);
      check = true;
      return res.redirect('html/login.html');
    }
  }
  if (check == false) {
    check = false;
    return res.redirect('html/forget.html?error = 1');
  }
})

app.listen(port, hostname, () => {
  console.log(`Server running at   http://${hostname}:${port}/html/index.html`);
})