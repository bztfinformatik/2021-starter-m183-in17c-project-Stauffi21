const token = require("jsonwebtoken");
const User = require("../models/user");
const c = require("../util/const");
const helper = require("../util/helper");

exports.getHelloWorld = (req, res, next) => {
  res.status(200).json({
    message: "Hello World",
  });
};

exports.doNothing = (req, res, next) => {
  res.status(200).json({});
};

exports.postMessage = (req, res, next) => {
  const header = req.body.header;
  const content = req.body.content;

  res.status(201).json({
    statusmessage: "Message posted successfully",
    post: { id: new Date().toISOString(), header: header, content: content },
  });
};


exports.getUsers = async (req, res, next) => {
  try {
    let result = new Array(0);
    if (helper.isEmpty(req.query)) {
      result = await User.getByIds(req.params.ids);
    } else {
      try {
        result = await User.filter(req.query);
      } catch (err) {
        if (err.errno != c.ERR_DB_UNKONW_COLUMN) {
          throw err;
        }
      }
    }
    res.status(200).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  firstname = req.body.firstname;
  lastname = req.body.lastname,
  username = req.body.username,
  pwd = req.body.pwd,
  avatar = req.body.avatar,
  user = {}
  user = await User.getByUsername(username);
  
  if ( firstname && lastname && username && pwd && avatar) 
  {
    if(Object.keys(user).length === 0)
    {
      result = await User.add(firstname, lastname, username, pwd, avatar);
      user = User.getByUsername(username).id
      res.status(201).json({
        user
      });
    }else{
      errorMessage = "User already exists."
      res.status(409).json({
        errorMessage 
      });
    }
  }else{
    errorMessage = "connect ECONNREFUSED 127.0.0.1:3306"
    res.status(500).json({
      errorMessage 
    });
  }
};