import userModel from "../models/userModel.js";

export const updateUserController = async( req,res,next) => {
   try{
    const {name,email,lastName,location} = req.body;
    if(!name || !email || !lastName || !location) {
        next('Please provide all fields');
    }
    const user= await userModel.findOne({_id: req.user.userId});
    user.name=name;
    user.lastName=lastName;
    user.email=email;
    user.location=location;

    await user.save();
    const token= user.createJWT();
    res.status(200).json({
        user,
        token
    })
}
catch(error){
    next(error);
}
}
export const getUserController = async( req,res,next) => {
    try{
     const {email} = req.body;
     if(!email) {
         next('Please provide email');
     }
     const user= await userModel.findOne({email});
     if(!user)
     {
        next('user does not exist');
     }
     res.status(200).json({
         name:user.name,
         email: user.email,
         lastName:user.lastName,
         location:user.location
     })
 }
 catch(error){
     next(error);
 }
 }