import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validate
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "please provide name",
      });
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
    res.status(201).send({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error In Register Controller",
      success: "false",
      error,
    });
  }
};
