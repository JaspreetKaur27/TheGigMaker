const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./routes");

// API Routes
router.use("/api", apiRoutes);

// Use the react app if no api routes are hit
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;