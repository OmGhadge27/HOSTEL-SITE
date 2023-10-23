const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user")


//? access -> public
const registerUser = async (req, res) => {
    try {
        //* Step 1: Destructure username, email, and password from the request body
        const {
            fullname,
            dateOfBirth,
            gender,
            contactNumber,
            emailID,
            fatherName,
            motherName,
            parentContactNo,
            parentEmailID,
            streetAddress,
            city,
            state,
            postalCode,
            rollNo,
            department,
            semester,
            enrollmentYear,
            expectedGraduationYear,
            username,
            password,
            confirmPassword,
          } = req.body;

          // Check if password and confirmPassword match
        if (password !== confirmPassword) {
          res.status(400);
          throw new Error("Password and confirmPassword do not match");
        }

          //* Step 2: Check if any of the required fields are missing
          const missingFields = [];     //creating an empty array to push all the fields that are missing.

          if (!fullname) missingFields.push("fullname");
          if (!dateOfBirth) missingFields.push("dateOfBirth");
          if (!gender) missingFields.push("gender");
          if (!contactNumber) missingFields.push("contactNumber");
          if (!emailID) missingFields.push("emailID");
          if (!fatherName) missingFields.push("fatherName");
          if (!motherName) missingFields.push("motherName");
          if (!parentContactNo) missingFields.push("parentContactNo");
          if (!parentEmailID) missingFields.push("parentEmailID");
          if (!streetAddress) missingFields.push("streetAddress");
          if (!city) missingFields.push("city");
          if (!state) missingFields.push("state");
          if (!postalCode) missingFields.push("postalCode");
          if (!rollNo) missingFields.push("rollNo");
          if (!department) missingFields.push("department");
          if (!semester) missingFields.push("semester");
          if (!enrollmentYear) missingFields.push("enrollmentYear");
          if (!expectedGraduationYear) missingFields.push("expectedGraduationYear");
          if (!username) missingFields.push("username");
          if(!password) missingFields.push("password");
          if(!confirmPassword) missingFields.push("confirmPassword");
          
          if (missingFields.length > 0) {

            if (missingFields.length == 1) {
              res.status(400); // Set HTTP response status to 400 (Bad Request)
              throw new Error(`The following field is missing: ${missingFields.join(', ')}`);
            }

            res.status(400); // Set HTTP response status to 400 (Bad Request)
            throw new Error(`The following fields are missing: ${missingFields.join(', ')}`);
          }
          

        //* Step 3: Check if the user with the provided username and emailID already exists
        const userAvailable = await User.findOne({ username, emailID });
        if (userAvailable) {
            // If the user exists, set the HTTP status to 400 and throw an error
            res.status(400);
            throw new Error("User already registered!");
        }

        //* Step 4: Hash the provided password
        const hashedPassword = await bcrypt.hash(password, 10);   //hash only the password field as password and confirmPassword are same

        //* Step 5: Create a new user record in the database
        const user_generation = await User.create({
            fullname,
            dateOfBirth,
            gender,
            contactNumber,
            emailID,
            parentDetails: {
              fatherName,
              motherName,
              parentContactNo,
              parentEmailID,
            },
            address: {
              streetAddress,
              city,
              state,
              postalCode,
            },
            studentInfo: {
              rollNo,
              department,
              semester,
              enrollmentYear,
              expectedGraduationYear,
            },
            username,
            password: hashedPassword,
            confirmPassword: hashedPassword,
          });
          

        //* Step 6: Handle the response based on the result of user creation
        if (user_generation) {
            // If user generation was successful, respond with a 201 status and user information
            console.log("Successfully created the user!");
            console.log(user_generation);
            res.status(201).json({ _id: user_generation.id, email: user_generation.emailID, username: user_generation.username, password: user_generation.password });
        } else {
            // If user creation failed, set the HTTP status to 400 and throw an error
            res.status(400);
            throw new Error('Unable to create an account!');
        }
    } catch (error) {
        //* Step 7: Handle any errors that occurred during registration
        res.status(500).json({ error: error.message });
    }
};


// ? access -> public
const loginUser = async (req, res) => {
    try {
        //* Step 1: Destructure email and password from the request body
        const { username, password } = req.body;
        if (!username || !password) {
            //* Step 2: Check if email and password are provided
            res.status(400); // Set HTTP response status to 400 (Bad Request)
            throw new Error("All fields are mandatory!"); // Throw an error
        }

        //* Step 3: Attempt to find a user with the provided username in the database
        const user = await User.findOne({ username });

        //* Step 4: Compare the provided password with the hashed password in the database
        if (user && (await bcrypt.compare(password, user.password))) {
            //* Step 5: If the passwords match, create an access token
            const accessToken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user._id,
                    },
                },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            // * Step 6: Respond with a 200 OK status and the access token
            res.status(200).json({ 
                message: "SuccessFully Logged in",
                accessToken : accessToken ,
             });
             console.log("Successfully Logged in")
        } else {
            // * Step 7: If email or password is incorrect, set HTTP status to 401 (Unauthorized)
            res.status(401);
            throw new Error("Username or Password is invalid!");
        }
    } catch (error) {
        //* Step 8: Handle any errors that occur during login
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};


//* search user based on the id provided
//! validation pending
const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};


//* update user based on the id provided
//! validation pending
const updateUserById = async (req, res) => {
    try {
      const updatedUserData = req.body;
  
      const user = await User.findByIdAndUpdate(req.params.id, updatedUserData, {
        new: true, // Return the updated user
        runValidators: true, // Run validation on update
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      console.log("Successfully updated the user!");
    //   console.log(user);
      res.status(200).json({message: "Successfully updated the user", user});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};


//* delete user based ion the id provided
//! validation pending
const deleteUserById = async (req, res) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      console.log("Successfully deleted the user : ", user);
      res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { registerUser, loginUser, getUserById, updateUserById, deleteUserById };
