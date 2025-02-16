const express = require('express');
const {inquery,getinquery} = require ("../controller/inquery.ctrl")
const router = express.Router();

// Example route for handling inquiries
router.get('/',getinquery);

router.post("/inquery",inquery );



module.exports = router;