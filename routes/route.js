const express = require("express");
const controllers = require("../controllers/controllers");
const router = express.Router();

router.get("/mail/list/:email", controllers.getMails);

module.exports = router;
