const jwt = require("jsonwebtoken");
const User = require("../models/user");

//* the following code is to validate the token generated while logging in
// const validateToken = async (req, res, next ) => {
//     // let token;
//     let authHeader = req.headers.Authorization || req.headers.authorization;
//     console.log(authHeader);
//     if (authHeader) {
//         // token = authHeader.split(" ") [1];
//         const user =  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//             if (err) {
//                 res.status(401);
//                 throw new Error("User is not authorised");
//             }
//             // req.user = decoded.user;
//             return decoded;
//             // next();
//         });
//         const _id = user._id
//         console.log(_id);
//     } else {
//         res.status(401);
//         throw new Error("User is not verified or token is missing");
//     };
// };

// module.exports = validateToken;



const validateToken = async (req, res, next) => {
    //* extracting token from header
    const token = req.headers.authorization
    console.log(token);
  
    if (!token) {
      res.status(400).json({ status: false, message: 'Token required' })
    }
  
    try {
      const user=jwt.verify(token,process.env.JWT_SECRET,(err,res)=>{
          if(err){
            console.log(err);
            return "token expire";
          }
          // console.log(res);
          return res;
      })
      const _id=user.user.id;
      // console.log(user.user.id);
      if(user=="token expire"){
        return res.json({status:"error",data:"token expire"})
      }
      const userInfo= await User.findOne({_id:_id})
      if(userInfo){
    //    console.log("hello");
    //    console.log(userInfo);
        req.user = userInfo; 
     }
      else{
        return res.json({error:"User not found"});
      }
     } catch (error) {
      res.status(500).json({ error: "Internal server error" });
     }
    next();
}

module.exports = validateToken;