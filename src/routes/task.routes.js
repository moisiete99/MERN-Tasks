const express = require("express");
const router = express.Router(); //para ingresar rutas

router.get("/", (req, res) => {
  res.json({
   status: 'API works'
  });
});

module.exports = router;
