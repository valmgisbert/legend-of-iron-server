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

//POST add the save file and update the user with the save file
settingsRouter.post('/saveload', (req, res, next) => {
  const saveFile = req.body;
  saveFile.user = req.session.currentUser._id;

  SaveFile.create(saveFile)
    .then( (newSaveFile) => {
      User.findByIdAndUpdate(req.session.currentUser._id, {$push: {saveSlots: newSaveFile._id}}, {new: true})
        .populate("saveSlots")
        .then( (updatedUser) => res.status(200).json(updatedUser))
        .catch( (err) => res.status(400).json(err))
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