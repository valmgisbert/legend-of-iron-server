const express = require("express");
const settingsRouter = express.Router();
const User = require("../models/user");
const SaveFile = require("../models/saveFile");

//GET find all users 
settingsRouter.get('/editstudent', (req, res, next) => {
  const userId = req.session.currentUser._id;
  console.log('userId', userId)
  User.findById(userId)
    .then( (userInfo) => {
      res.status(200)
      .json(userInfo)
    })
    .catch( (err) => {
      res.status(400)
      .json(err)
    });
})

//PUT edit user info (only studentName and cohort)
settingsRouter.put('/editstudent', (req, res, next) => {
  const studentId = req.session.currentUser._id;
  const {studentName, cohort} = req.body;

  User.findByIdAndUpdate(studentId, {studentName, cohort})
    .then( (modifiedStudent) => {
      res.status(200)
      .json(modifiedStudent);
    })
    .catch( (err) => {
      res.status(400)
      .json(err);
    });
})

//GET see the saveload menu with all the save files
settingsRouter.get('/saveload', (req, res, next) => {
  SaveFile.find()
    .then( (saveFiles) => {
      res.status(200)
      .json(saveFiles);
    })
    .catch( (err) => {
      res.status(400)
      .json(err);
    });
})

//GET see the saveload menu with all the save files
settingsRouter.post('/saveload', (req, res, next) => {
  SaveFile.create()
    .then( (newSaveFile) => {
      res.status(200)
      .json(newSaveFile);
    })
    .catch( (err) => {
      res.status(400)
      .json(err);
    });
})

//DELETE an existing save file
settingsRouter.delete('/saveload/:id', (req, res, next) => {
  const saveFileId = req.params.id;

  SaveFile.findByIdAndDelete({_id: saveFileId})
    .then( (deletedFile) => {
      res.status(200)
      .json(deletedFile);
    })
    .catch( (err) => {
      res.status(400)
      .json(err);
    });
})

module.exports = settingsRouter;