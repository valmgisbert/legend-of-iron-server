const express = require("express");
const authRouter = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin
} = require("../helpers/middlewares");

// POST '/auth/signup'
authRouter.post('/signup', isNotLoggedIn, async (req, res, next) => {
  const { username, password, studentName, cohort } = req.body;
  console.log('body', req.body);
  
  try {																									 // projection
    const usernameExists = await User.findOne({ username }, 'username');
    
    if (usernameExists) return next(createError(400));
    else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = await User.create({ username, password: hashPass, studentName, cohort });

      newUser.password = "*";
      req.session.currentUser = newUser;
      res
        .status(201)  //  Created
        .json(newUser);
    }
  } 
  catch (error) {
    next(createError(error));
  }
},
);

// POST '/auth/login'
authRouter.post('/login', isNotLoggedIn, validationLogin, async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }) ;
    if (!user) {
      next(createError(404));
    } 
    else if (bcrypt.compareSync(password, user.password)) {
      
      user.password = '*';
      req.session.currentUser = user;
      res
        .status(200)
        .json(user);
    //return;	 			TODO - remove from the notes
    } 
    else {
      next(createError(401));	// Unauthorized
    }
  } 
  catch (error) {
    next(createError(error));
  }
},
);

// POST '/auth/logout'
authRouter.post('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy();
  res
    .status(204)  //  No Content
    .send();
});

// GET '/auth/me'
authRouter.get('/me', isLoggedIn, (req, res, next) => {
  const currentUserSessionData = req.session.currentUser;
  currentUserSessionData.password = '*';
  
  res.status(200).json(currentUserSessionData);
});

module.exports = authRouter;
