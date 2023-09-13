const myService = require("./my-service");
const section = require("./section");
const lesson = require("./lesson");
const exercise = require("./exercise.service");
const world = require("./world.service");
const lessonCompleted = require("./lessonCompleted.service");
module.exports = {
  myService,
  section,
  lesson,
  exercise,
  world,
  "lesson-completed": lessonCompleted,
};
