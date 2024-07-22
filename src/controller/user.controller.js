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

        const accessToken = jwt.sign(
            { _id: user._id, role: user.role },
            'QWERTYUIOP',
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { _id: user._id },
            'QWERTYUIOPt',
            { expiresIn: '2d' }
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

        const bcryptpassword = await bcrypt.hash(password, 10)

        console.log(req.body);
        const user = await Users.create({ ...req.body, password: bcryptpassword });


        console.log(user);

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
            success: false,
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

        console.log(user.password, password, "ssss");
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch, "isMatch");

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect password.'
            });
        }

        const { accessToken, refreshToken } = await generateTokens(user.id);

        const userF = await Users.findById(user._id).select("-password", "-refreshToken");

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
                data: {
                    user: {
                        ...userF.toJSON()
                    }
                }
            });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message
        });
    }
};



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
    // updateuser,
    // deleteuser,
    // getuser,
    // countsubuser
}