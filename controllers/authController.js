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
      // next('email is required');
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "please provide password",
      });
      // next('password is required');
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Email Already Registered please login",
      });
      // next('Email Already Registered please login');
    }
    const user = await userModel.create({ name, email, password });
    res.status(201).send({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
