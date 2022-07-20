const express = require("express");
const router = express.Router(); //para ingresar rutas
const Task = require('../models/task')

router.get("/", (req, res) => {
   Task.find((err, tasks) => {
      console.log(tasks)
      res.json({
       status: 'API works'
      });
   })

});

module.exports = router;
