const section = require("./section");
const world = require("./world");
const lesson = require("./lesson");
const exercise = require("./exercise");
const worldCompleted = require("./world-completed");
const lessonCompleted = require("./lesson-completed");
const exerciseCompleted = require("./exercise-completed");
const sectionCompleted = require("./section-completed");
module.exports = {
  section,
  world,
  lesson,
  exercise,
  "world-completed": worldCompleted,
  "lesson-completed": lessonCompleted,
  "exercise-completed": exerciseCompleted,
  "section-completed": sectionCompleted,
};
