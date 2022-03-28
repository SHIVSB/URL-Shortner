const express = require("express");
const router = express.Router();
const urlController = require("../../../src/controllers/urlController");
const userController = require("../../../src/controllers/userController");

router.get("/", urlController.shortenURL);
router.get("/allUrls", urlController.getAllUrl);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/shortUrls",userController.isAuthenticated, urlController.getUrlByUserId);

module.exports = router;