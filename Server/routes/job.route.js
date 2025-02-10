const express = require("express")
const { createJobPost, updateJobPost, deleteJobPost, markAsFilled,getJobs,repostJob } = require("../controller/job.ctrl")
const { authMiddleware } = require("../middleware/authmiddleware");
const router = express.Router();

router.get("/" ,getJobs )
router.post("/", createJobPost);
router.put("/update/:id", updateJobPost);
router.delete("/:id", deleteJobPost);
router.put("/markasfilled/:id", markAsFilled);
router.post("/:id/repost", repostJob);

module.exports = router;
