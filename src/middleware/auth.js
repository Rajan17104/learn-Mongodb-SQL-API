const jwt = require('jsonwebtoken');
const Users = require('../model/users.model');

const auth = (role = []) => async (req, res, next) => {
    //Authatication of user
    try {
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        console.log(token);

        if (!token) {
            return res.status(400).json({
                success: false,
                error: "Please authenticate.",
                message: "Please authenticate.",
            })
        }
        try {
            const checkToken = await jwt.verify(token, "QWERTYUIOP");
            console.log(checkToken);

            const user = await Users.findById(checkToken._id);

            if(!role.some((v)=>v === user.role)){
                return res.status(400).json({
                    success: false,
                    error: "You are not authorized to access this resource.",
                    message: "You are not authorized to access this resource."
            })
        }
            req.user = user;
            next();
            // res.status(200).json({
            //     message: "Autheticated successfully"
            // })

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid Token",
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message
        });
    }
}

module.exports = auth