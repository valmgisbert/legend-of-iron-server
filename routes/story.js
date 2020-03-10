const express = require("express");
const storyRouter = express.Router();
const User = require("../models/user");
const SaveFile = require("../models/saveFile");

// //POST create save file 
// storyRouter.post('/', (req, res, next) => {

// })

//POST send the choices to the savefile w/saveloadId
storyRouter.post('/:id', (req, res, next) => {
  const storyId = req.params.id;

  SaveFile.findByIdAndUpdate(storyId, {gameState})
    .then( (updatedFile) => {
      res.status(200)
      .json(updatedFile);
    })
    .catch( (err) => {
      res.status(400)
      .json(err);
    });
})

//GET load the savefile w/saveloadId
storyRouter.get('/:id', (req, res, next) => {
  const storyId = req.params.id;

  SaveFile.findById(storyId)
    .then( (saveFile) => {
      res.status(200)
      .json(saveFile);
    })
    .catch( (err) => {
      res.status(400)
      .json(err)
    });
})

module.exports = storyRouter;