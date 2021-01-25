// const express = require('express')
// const app = express();
// const Workout = require("../models/workoutModel.js");

const db = require("../models");


// module.exports = function (app) {

    //comment in to prepopulate database
    // db.Workout.find({}).then(function (res) {
    //     console.log("Checking if db is populated");
    //     if (res.length === 0) {
    //         console.log("DB is empty");
    //         require("./seeders/seed.js");
    //     }
    // });

    //get workouts
    module.exports = function (app) {

        app.get("/api/workouts", (req, res) => {
            db.Workout.find({})
            .sort({ date: -1 })
            .then(dbWorkout => {
              res.json(dbWorkout);
            })
            .catch(err => {
              res.status(400).json(err);
            });
          });
    

    // add exercise
    app.put("/api/workouts/:id", (req, res) => {

        db.Workout.findOneAndUpdate(
            { _id: req.params.id },
            {
                $inc: { totalDuration: req.body.duration },
                $push: { exercises: req.body }
            },
            { new: true }).then(dbWorkout => {
                res.json(dbWorkout);
            }).catch(err => {
                res.json(err);
            });

    });

    //create workout
    app.post("/api/workouts", ({ body }, res) => {
        // console.log("WORKOUT TO BE ADDED");
        // console.log(body);

        db.Workout.create(body).then((dbWorkout => {
            res.json(dbWorkout);
        })).catch(err => {
            res.json(err);
        });
    });

    // get workouts in range
    app.get("/api/workouts/range", (req, res) => {

        db.Workout.find({}).then(dbWorkout => {
            console.log("ALL WORKOUTS");
            console.log(dbWorkout);

            res.json(dbworkout);
        }).catch(err => {
            res.json(err);
        });

    });
};