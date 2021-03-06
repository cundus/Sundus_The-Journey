const { User } = require("../../models");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { body } = req;
    console.log("ini adalahbody", req.body);

    const schema = joi.object({
      fullName: joi.string().min(4).required(),
      email: joi.string().email().min(4).required(),
      password: joi.string().min(8).required(),
      phone: joi.string().min(8).required(),
      address: joi.string().min(8).required(),
    });

    const { error } = schema.validate(body);

    if (error) {
      return res.status(400).send({
        status: 400,
        message: error.details[0].message,
      });
    }

    const { email, password } = body;
    const emailCheck = await User.findOne({ where: { email: email } });

    if (emailCheck) {
      return res.status(400).send({
        status: 400,
        message: "Email already registered",
      });
    }

    const hashStrength = 10;
    const hashedPassword = await bcrypt.hash(password, hashStrength);

    const dataUser = await User.create({
      ...body,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: dataUser.id,
      },
      process.env.SECRET_KEY
    );

    res.status(200).send({
      status: 200,
      message: "Success create user, You can login now",
      data: {
        email: dataUser.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, Register Failed",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = req.body;

    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(userData);

    if (error) {
      return res.status(400).send({
        status: 400,
        message: error.details[0].message,
      });
    }

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (!checkEmail) {
      return res.status(400).send({
        status: 400,
        message: "Email Or Password Don't Match",
      });
    }
    const isValidPassword = await bcrypt.compare(password, checkEmail.password);

    if (!isValidPassword) {
      return res.status(400).send({
        status: 400,
        message: "Email Or Password Don't Match",
      });
    }
    const token = jwt.sign(
      {
        id: checkEmail.id,
      },
      process.env.SECRET_KEY
    );

    res.status(200).send({
      status: 200,
      message: "Success Login",
      data: {
        email: checkEmail.email,
        role_id: checkEmail.role_id,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, Cannot Sign In",
    });
  }
};
