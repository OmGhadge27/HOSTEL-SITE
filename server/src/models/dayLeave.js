// const mongoose = require("mongoose");

// const dayLeaveSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   dateOfLeaving: { type: Date, required: true },
//   timeOfLeaving: { type: Date, required: true },
//   purpose: { type: String, required: true },
//   timeOfReturn: { type: Date, required: true },
//   fullName: String,
//   emailID: String,
//   rollNo: Number,
//   contactNumber: String,
// });

// // Virtual field to populate user details
// dayLeaveSchema.virtual("userDetails", {
//   ref: "User",
//   localField: "user",
//   foreignField: "_id",
//   justOne: true,
// });

// // Pre-save middleware to populate fields from the User model
// dayLeaveSchema.pre("save", async function (next) {
//   try {
//     // Use the populate method to populate user details
//     await this.populate("userDetails", [
//       "fullname",
//       "emailID",
//       "studentInfo.rollNo",
//       "contactNumber"
//     ]).execPopulate();

//     // After populating, set the fields in your "dayLeave" schema
//     this.fullName = this.userDetails.fullname;
//     this.emailID = this.userDetails.emailID;
//     this.rollNo = this.userDetails.studentInfo.rollNo;
//     this.contactNumber = this.userDetails.contactNumber;

//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// // Create the "DayLeave" model
// const DayLeave = mongoose.model("DayLeave_Application", dayLeaveSchema);

// module.exports = DayLeave;



const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const dayLeaveSchema = new mongoose.Schema({
  dateOfLeaving: { type: Date, required: true },
  timeOfLeaving: { type: Date, required: true },
  purpose: { type: String, required: true },
  timeOfReturn: { type: Date, required: true },
  PostedBy: {
    type: ObjectId,
    ref: "User",
    select: 'fullname contactNumber emailID studentInfo.rollNo studentInfo.department',
  },
  fullname: String, 
  contactNumber: String, 
  emailID: String,
  rollNo: Number, 
  department: String, 


});

const DayLeave = mongoose.model("DayLeave_Application", dayLeaveSchema);

module.exports = DayLeave;
