const express = require("express");
const router = express.Router();
const {getVacationLeave, createVacationLeaves} = require("../controllers/vacationLeave")
const validateToken = require("../middleware/auth");


//* using the validation for dayleave route
//* made it private route after using validateToken  only verified users can perform this action

// router.get("/vacation-leave", validateToken, getVacationLeave);
router.post("/vacation_leave", (req,res)=>{
console.log(req.body);
});


module.exports = router;