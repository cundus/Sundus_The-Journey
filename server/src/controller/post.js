const { Post, User } = require("../../models");
const { Op } = require("sequelize");

exports.addPost = async (req, res) => {
  try {
    const { body, idUser } = req;
    const data = {
      ...body,
      userId: idUser,
      picture: req.files.picture[0].filename,
    };
    const addedPost = await Post.create(data);

    res.status(200).send({
      status: 200,
      message: "Success add new post",
      data: addedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, Add Post Failed",
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const postsData = await Post.findAll({
      attributes: {
        exclude: ["updatedAt", "userId"],
      },
      include: {
        model: User,
        as: "User",
        attributes: ["id", "fullName"],
      },
    });

    res.status(200).send({
      status: 200,
      message: "Success get all post",
      data: postsData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, Get All Post Failed",
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const postsData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: ["updatedAt", "userId"],
      },
      include: {
        model: User,
        as: "User",
        attributes: ["id", "fullName"],
      },
    });

    res.status(200).send({
      status: 200,
      message: "Success get post",
      data: postsData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, Get Post Failed",
    });
  }
};

exports.getPostByUserLogin = async (req, res) => {
  try {
    const postsData = await Post.findOne({
      where: {
        userId: req.idUser,
      },
      attributes: {
        exclude: ["updatedAt", "userId"],
      },
      include: {
        model: User,
        as: "User",
        attributes: ["id", "fullName"],
      },
    });

    res.status(200).send({
      status: 200,
      message: "Success get post",
      data: postsData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, Get Post Failed",
    });
  }
};

exports.getPostByUser = async (req, res) => {
  try {
    const postsData = await Post.findOne({
      where: {
        userId: req.params.userid,
      },
      attributes: {
        exclude: ["updatedAt", "userId"],
      },
      include: {
        model: User,
        as: "User",
        attributes: ["id", "fullName"],
      },
    });

    res.status(200).send({
      status: 200,
      message: "Success get post",
      data: postsData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, Get Post Failed",
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { body } = req;
    const id = req.params.id;
    await Post.update(body, {
      where: { id: id },
    });

    const postsData = await Post.findOne({
      where: { id: id },
      attributes: {
        exclude: ["updatedAt", "userId"],
      },
      include: {
        model: User,
        as: "User",
        attributes: ["id", "fullName"],
      },
    });

    res.status(200).send({
      status: 200,
      message: "Success Update post",
      data: postsData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, Update Post Failed",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const data = await Post.findOne({
      where: { id: req.params.id },
    });

    if (!data) {
      res.status(400).send({
        status: 400,
        message: `Post with ID = ${req.params.id} is unavailable or has been deleted`,
      });
      return;
    }

    await Post.destroy({
      where: { id: req.params.id },
    });
    res.status(200).send({
      status: 200,
      message: "Success Delete post",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, Delete Post Failed",
    });
  }
};
