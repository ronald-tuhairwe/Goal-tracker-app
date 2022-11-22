const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let SECRET;

exports.authenticate = (req, res, next) => {
    const [, token] = req.headers.authorization.split(" ");
    try {
        let permission = jwt.verify(token, SECRET);
        res.status(200).json({success:true,  data:permission});
    } catch (err) {
        res.status(400).json({success:false, data:"Invalid JWT"});
    }
}

exports.test=(req,res,next)=>{
    res.status(200).send("It worked")
}
exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    SECRET = "login key for Angular";
    const user = await User.findOne({ email: email });
    if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            const accessToken = jwt.sign({
                id: user._id,
                email: user.email,
                iat: Date.now()
            }, SECRET);
            res.status(200).json({success:true, data:accessToken});
        } else {
            res.status(400).json({success:false , data:'wrong password or username'})
        }
    } else {
        res.status(400).json({success:false , data:'wrong password or username'})
    }
}

exports.signup = async (req, res, next) => {
    req.body.password= await bcrypt.hash(req.body.password, 10)
    const newUser = new User(req.body);
    try {
        await newUser.save()
        res.status(201).json({success:true, data:newUser});
    } catch (error) {
        res.status(201).json({success:true, data:"not unique username"});
    }

}