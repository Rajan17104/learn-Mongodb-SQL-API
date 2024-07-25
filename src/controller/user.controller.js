const Users = require("../model/users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateTokens = async (id) => {
    try {
        const user = await Users.findById(id);

        if (!user) {
            res.status(400).json({
                success: false,
                message: 'user note exist.'
            })
            throw new Error('User not found.');
        }

        const accessToken = jwt.sign({ 
            _id: user._id,
            role: user.role,
            expiresIn: '1 hour'
         },
            'QWERTYUIOP',
            { expiresIn: '1 hour' }
        );

        const refreshToken = jwt.sign(
            { _id: user._id },
            'QWERTYUIOPt',
            { expiresIn: '2 days' }
        );

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Token generation error:', error);
        throw new Error('Error generating tokens.');
    }
};

// const getuser = async (req,res) => {

//     try {
//         const aggregatedData = await user.aggregate([
//           // Your aggregation pipeline stages go here
//           // Example:
//           { $group: { _id: '$user', totalProducts: { $sum: 1 } } }
//         ]);

//         res.json(aggregatedData);
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//       }



//     // try {
//     //     console.log(req.params.user_id);
//     //     const user = await user.findById(req.params.user_id);
//     //     console.log(user);

//     //     if (!user) {
//     //         res.status(404).json({
//     //             success: false,
//     //             message: 'user data not found.'
//     //         })
//     //     }

//     //     res.status(200).json({
//     //         success: false,
//     //         message: 'user data fetched.',
//     //         data: user
//     //     })
//     // } catch (error) {
//     //     res.status(500).json({
//     //         success: false,
//     //         message: 'Internal server error'+ error.message
//     //     })
//     // }
// }

const registerUser = async (req, res) => {
    try {

        const { email, password } = req.body

        const userf = await Users.findOne({
            $or: [{email}]
        })

        if (userf) {
            res.status(409).json({
                success: false,
                message: 'user already exists'
            })
        }

        const bcryptpassword = await bcrypt.hash(password, 10)

        console.log(req.body);
        const user = await Users.create({ ...req.body, password: bcryptpassword });


        if (!user) {
            res.status(409).json({
                success: false,
                message: 'user can not create.'
            })
        }

        if (!bcryptpassword) {
            res.status(500).json({
                success: false,
                message: 'password not bicrpt serverr error.'
            })
        }

        const userF = await Users.findById(user._id).select("-password")

        res.status(201).json({
            success: true,
            message: 'user data created.',
            data: userF
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error' + error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User does not exist.'
            });
        }

        // console.log(user.password, password, "ssss");
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch, "isMatch");

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect password.'
            });
        }

        const { accessToken, refreshToken } = await generateTokens(user._id);

        console.log(user._id,"scSCzxcsAxc");
        const userF = await Users.findById(user._id).select("-password -refreshToken");
        console.log(userF,"userF");

        const option = {
            httpOnly: true,
            secure: true
        };

        res.status(200)
            .cookie('accessToken', accessToken, option)
            .cookie('refreshToken', refreshToken, option)
            .json({
                success: true,
                message: 'User logged in successfully.',
                data: {...userF.toObject(),accessToken}
            });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message
        });
    }
};

const relogin = async(req ,res) =>{
    try {
        console.log("req.body :::", req.cookies.refreshToken);
    
        const checkToken = await jwt.verify(req.cookies.refreshToken, "QWERTYUIOPt");
      
        console.log(checkToken);
      
        if (!checkToken) {
          return res.status(400).json({
            success: false,
            message: "Token expired",
          });
        }
      
        const user = await Users.findById(checkToken._id);
        console.log("user::::: ", user);
      
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "Invalid Token",
          });
        }
    
        if (req.cookies.refreshToken != user.toObject().refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Invalid user Token",
              });
        }
        const data = await generateTokens(user._id);
    
        const option = {
          httpOnly: true,
          secure: true,
        };
    
        res
          .status(200)
          .cookie("accsesstoken", data.accessToken, option)
          .cookie("refreshToken", data.refreshToken, option)
          .json({
            success: true,
            message: "login success",
            data: data.accsesstoken
          });
    
     
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal server error: " + error.message,
        });
      }
}



// const updateuser = async (req,res) => {
//     try {
//         console.log(req.params.user_id);
//         const user = await user.findByIdAndUpdate(req.params.user_id,req.body,{new: true, runValidators: true})


//         if (!user) {
//             res.status(400).json({
//                 success: false,
//                 message: 'user data not found.'
//             })
//         }

//         res.status(200).json({
//             success: false,
//             message: 'user Updated Successfully.',
//             data: user
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error'+ error.message
//         })
//     }
// }

// const deleteuser = async (req,res) => {
//     try {
//         console.log(req.params.user_id);
//         const user = await user.findById(req.params.user_id);

//         if (!user) {
//             res.status(404).json({
//                 success: false,
//                 message: 'user data not found.'
//             })
//         }

//         const data = await user.findByIdAndDelete(req.params.user_id)

//         res.status(200).json({
//             success: false,
//             message: 'user Deleted Successfully.',
//             data: data
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error'+ error.message
//         })
//     }
// }



module.exports = {
    // listuser,
    registerUser,
    loginUser,
    relogin
    // updateuser,
    // deleteuser,
    // getuser,
    // countsubuser
}