import userModel from "../models/userModel.js";

export const registerController = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;
    //validate
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "please provide name",
      });
      // We can use middleware to show the error
      // next('name is required');
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "please provide email",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "please provide password",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Email Already Registered please login",
      });
    }
    const user = await userModel.create({ name, email, password });
    //token
    const token=user.createJWT();
    res.status(201).send({
      success: true,
      message: "User Created Successfully",
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res,next) => {
  try{
     // validation
        const {email,password}= req.body;
        if(!email || !password)
        {
          next('Please provide all fields')
        }

        const user=await userModel.findOne({email});
        if(!user)
        {
          next('Invalid Username or password');
        }
        //compare password
        const isMatch = await user.comparePassword(password);
        if(!isMatch)
        {
          next('Invalid Username or password');
        }
        const token = user.createJWT();
        res.status(200).json({
          success:true,
          message:'Login successfully',
          user,
          token
        })
  }
  catch(error){
    next(error);
  }
}
