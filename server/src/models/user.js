const mongoose = require("mongoose");

// User Schema
const userSchema = mongoose.Schema({
  //* Personal Details
  fullname: {
    type: String,
    required: [true, "Please add your name"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please enter a valid date of birth"],
  },
  gender: {
    type: String,
    enum: ['female', 'male'],
    required: [true, "Please select your gender"],
  },
  contactNumber: {
    type: String,
    maxlength: 10,
    minlength: 10,
  },
  emailID: {
    type: String,
    required: true,
    unique: true, // Ensure email uniqueness
    trim: true,
    lowercase: true, // Store email in lowercase
    validate: {
      validator: function (value) {
        // Basic email format validation using regex
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email format or email address already in use',
    },
  },

  //* Parent Information
  parentDetails: {
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    parentContactNo: {
      type: Number,
      minlength: 10,
      maxlength: 10,
    },
    parentEmailID: {
      type: String,
      required: true,
      unique: true, // Ensure email uniqueness
      trim: true,
      lowercase: true, // Store email in lowercase
      validate: {
        validator: function (value) {
          // Basic email format validation using regex
          const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
          return emailRegex.test(value);
        },
        message: 'Invalid email format',
      },
    },
  },

  //* Residential Details
  address: {
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
  },

  //* Student Information
  studentInfo: {
    rollNo: {
      type: Number,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
      enum: ['IT', 'COMP-A', 'COMP-B', 'MECH-A', 'MECH-B', 'EXTC', 'ELEC'],
    },
    semester: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    enrollmentYear: {
      type: Date,
      required: true,
    },
    expectedGraduationYear: {
      type: Date,
      required: true,
    },
  },

  //* User Credentials
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;



// const new_userSchema = mongoose.Schema({
//     username: {
//         type: String,
//         required : [true, "Please add the username"],
//     },
//     email: {
//         type: String,
//         required: [true, "Please add the email id"],
//         unique: [true, "email address already taken"],
//     },
//     password: {
//         type: String,
//         required: [true, "Please add the user Password"],
//     },
// },{
//     timestamps: true,
// });





// module.exports = mongoose.model("New_User", new_userSchema);