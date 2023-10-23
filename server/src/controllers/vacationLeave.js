const VacationLeave = require("../models/vacationLeave");
const User = require("../models/user");


//* Retrieve vacation leave requests
//* this code will get all the vacation leave applications created by the specific user.

const getVacationLeave = async (req, res) => {
  try {
    // Check if the authenticated user's ID is available in req.user
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Retrieve the user's ID from req.user
    const userId = req.user.id;

    // Use the user's ID to filter day leave applications
    const vacationLeave_data = await VacationLeave.find({ PostedBy: userId });

    res.status(200).json({ vacationLeave_data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//* create vacation leave applications

const createVacationLeaves = async (req, res) => {
  console.log(req.body);
    try {
        //* Extract user information from the token
        const { _id } = req.user._id; // Assuming user's identity is stored in the "user" property of the request
        console.log("Object ID of the user submitting the application :- ",_id);

        //* Fetch user details from the User model
        const user = await User.findById(_id).select('fullname studentInfo.rollNo studentInfo.department contactNumber parentDetails.fatherName  parentDetails.motherName parentDetails.parentContactNo');
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        // console.log("----------------------------------------------------------------");
        console.log("User created");
        // console.log(user);
    
        const vacationLeaveData = req.body; // receive a single JSON object
        // console.log(vacationLeaveData);
        const {
          dateOfLeaving,
          purpose,
          dateOfReturn,
        } = vacationLeaveData;
    
        // console.log("-----------------------------------------------------------");
        console.log("This is the req.body section",req.body);
        // console.log(dateOfLeaving, purpose, dateOfReturn);
        
        //* Define and assign values to verified and approvedBy
        const verified = false; // Example value, you can set it based on your logic
        const approvedBy = null; // Example value, after proper implementation some faculty's name will come here.

        try {
          const vacationLeave = new VacationLeave({
            dateOfLeaving,
            purpose,
            dateOfReturn,
            PostedBy: _id,
            fullname: user.fullname,
            rollNo: user.studentInfo.rollNo,
            department: user.studentInfo.department,
            contactNumber: user.contactNumber,
            fatherName: user.parentDetails.fatherName,
            motherName: user.parentDetails.motherName,
            parentContactNo: user.parentDetails.parentContactNo,
            verified,
            approvedBy
          });
          await vacationLeave.save(); // Wait for the post to be saved before proceeding
          console.log("***********Success***************");      // if the user is created successfully
          return res.json(vacationLeave);
        } catch (error) {
          console.log(error);
          return res
            .status(400)
            .send("Error while submitting the content. Please try again.");
        }
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
}
    
module.exports = { getVacationLeave, createVacationLeaves };
