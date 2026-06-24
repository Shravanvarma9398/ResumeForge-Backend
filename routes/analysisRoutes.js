const express = require("express");
const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const upload =
require("../middleware/uploadMiddleware");

const {
uploadResume,
getAnalysisHistory,
} = require("../controllers/analysisController");

router.post(
"/upload",
protect,
upload.single("resume"),
uploadResume
);

router.get(
"/history",
protect,
getAnalysisHistory
);

module.exports = router;
