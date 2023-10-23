const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// creating a schema
const vacationLeaveSchema = new mongoose.Schema({
    dateOfLeaving: {
        type: Date,
        required:true
    },
    purpose: {
        type: String,
        required: true
    }, 
    dateOfReturn: {
        type:Date,
        required: Date
    },
    PostedBy: {
        type: ObjectId,
        ref: "User",
        select: 'fullname studentInfo.rollNo studentInfo.department contactNumber parentDetails.fatherName  parentDetails.motherName parentDetails.parentContactNo'
    },
    fullname: String,
    rollNo: Number,
    department: String,
    contactNumber: Number,
    fatherName: String,
    motherName: String,
    parentContactNo: Number,

    verified: {
        type: Boolean,
        default : false,
        required: false
    },
    approvedBy: {
        type: String,
        required:false
    }
});

module.exports = mongoose.model("VacationLeave_Application", vacationLeaveSchema) // here write the name as "DayLeave_Application", it will reflect as "DayLeave_Applications" in the database.