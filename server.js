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

var checkRegister = false;

app.post('/regisDB', async (req, res) => {
  let sql = "CREATE TABLE IF NOT EXISTS userInfo (id INT AUTO_INCREMENT PRIMARY KEY, User_Date TIMESTAMP, User_Name VARCHAR(300), User_Email VARCHAR(300), username VARCHAR(300), password VARCHAR(300))";
  let result = await queryDB(sql);
  sql = `Select username from userInfo`;
  result = await queryDB(sql)
  result = Object.assign({}, result);
  var keys = Object.keys(result);
  var check = false;

  if (req.body.password == req.body.confirm_password && checkRegister == false) {
    let now_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sql = `INSERT INTO userInfo (User_Date, User_Name, User_Email, username, password) VALUES ("${now_date}","${req.body.name}","${req.body.email}","${req.body.username}", "${req.body.password}")`;
    result = await queryDB(sql);
    check = true;
    checkRegister = true;
    return res.redirect('html/login.html');
  }

  if (checkRegister == true) {
    for (var user_num = 0; user_num < keys.length; user_num++) {
      if (req.body.password == req.body.confirm_password && req.body.username !== result[keys[user_num]].username) {
        let now_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        sql = `INSERT INTO userInfo (User_Date, User_Name, User_Email, username, password) VALUES ("${now_date}","${req.body.name}","${req.body.email}","${req.body.username}", "${req.body.password}")`;
        result = await queryDB(sql);
        check = true;
        return res.redirect('html/login.html');
      }
    }
  }
  if (check == false) {
    return res.redirect('html/register.html?error=1');
  }

})

app.post('/CheckLogin', async (req, res) => {
  let sql = "CREATE TABLE IF NOT EXISTS userInfo (id INT AUTO_INCREMENT PRIMARY KEY, User_Date TIMESTAMP, User_Name VARCHAR(300), User_Email VARCHAR(300), username VARCHAR(300), password VARCHAR(300))";
  let result = await queryDB(sql);
  sql = `Select username, password from userInfo`;
  result = await queryDB(sql);
  result = Object.assign({}, result);
  var keys = Object.keys(result);
  var check = false;

  for (var counter = 0; counter < keys.length; counter++) {
    if (req.body.username == result[keys[counter]].username &&
      req.body.password == result[keys[counter]].password) {
      var check = true;
      res.cookie("username", result[keys[counter]].username);
      res.cookie("password", result[keys[counter]].password);
      console.log(result[keys[counter]].username);
      return res.redirect('html/index_after_login.html');
    }
  }
  if (check == false) {
    check = false;
    return res.redirect('html/login.html?error=2');
  }
})

app.post('/UpdateDB', async (req, res) => {
  let sql = "CREATE TABLE IF NOT EXISTS userInfo (id INT AUTO_INCREMENT PRIMARY KEY, User_Date TIMESTAMP, User_Name VARCHAR(300), User_Email VARCHAR(300), username VARCHAR(300), password VARCHAR(300))";
  let result = await queryDB(sql);
  sql = `Select username from userInfo`;
  result = await queryDB(sql);
  result = Object.assign({}, result);
  var keys = Object.keys(result);
  var check = false;
  for (var information_num = 0; information_num < keys.length; information_num++) {
    if (req.body.username == result[keys[information_num]].username &&
      req.body.password == req.body.confirm_password) {
      let sql = `UPDATE userInfo SET password = '${req.body.password}' WHERE username = '${req.body.username}'`;
      let result = await queryDB(sql);
      check = true;
      return res.redirect('html/login.html');
    }
  }
  if (check == false) {
    check = false;
    return res.redirect('html/forget.html?error=3');
  }
})

app.get('/logout',(req,res)=>{
  res.clearCookie('username');
  return res.redirect('html/index.html');
})

app.get('/ReadSubject', async (req,res) => {
  let sql = "CREATE TABLE IF NOT EXISTS SubjectInfo (Subj_Code VARCHAR(30), username VARCHAR(300))";
  let result = await queryDB(sql);
  sql = `SELECT Subj_Code FROM SubjectInfo`;
    result = await queryDB(sql);
    result = Object.assign({}, result);
    res.json(result);
})


app.post('/AddSubject', async (req,res) => {
  let sql = "CREATE TABLE IF NOT EXISTS SubjectInfo (Subj_Code VARCHAR(30), username VARCHAR(300))";
  let result = await queryDB(sql);
  sql = `INSERT INTO SubjectInfo (Subj_Code, username) VALUES ("${req.body.subjectcode}","${req.body.username}")`;
  result = await queryDB(sql);
})


app.listen(port, hostname, () => {
  console.log(`Server running at   http://${hostname}:${port}/html/index.html`);
})
