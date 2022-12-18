const express = require('express');
const app = express();
const tourRoute = express.Router();
let Tour = require('../model/Tour');

// Add Tour
tourRoute.route('/add-tour').post((req, res, next) => {
    Tour.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all Tours
tourRoute.route('/').get((req, res) => {
    Tour.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Tour
tourRoute.route('/read-tour/:key').get((req, res) => {
    Tour.findById(req.params.key, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Tour
tourRoute.route('/update-tour/:key').put((req, res, next) => {
    Tour.findByIdAndUpdate(req.params.key, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Tour updated successfully!')
    }
  })
})

// Delete Tour
tourRoute.route('/delete-tour/:key').delete((req, res, next) => {
    Tour.findByIdAndRemove(req.params.key, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = tourRoute;