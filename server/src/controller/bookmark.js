const { Bookmark, User, Post } = require("../../models");
const { Op } = require("sequelize");

exports.addBookmark = async (req, res) => {
  try {
    const isExist = await Bookmark.findOne({
      where: { userId: req.idUser, postId: req.params.postId },
    });

    if (isExist) {
      return res.status(400).send({
        status: 400,
        message: "Post Has Been Bookmarked",
      });
    }

    const newBody = {
      postId: req.params.postId,
      userId: req.idUser,
    };
    const data = await Bookmark.create(newBody);

    res.status(200).send({
      status: 200,
      message: "Success Added New Bookmark",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, Create New Bookmark Failed",
    });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const bookmark = await Bookmark.findAll({
      attributes: ["id"],
      include: [
        {
          model: User,
          as: "User",
          attributes: ["id", "fullName"],
        },
        {
          model: Post,
          as: "Journey",
          attributes: {
            exclude: ["createdAt", "updatedAt", "userId"],
          },
        },
      ],
    });

    res.status(200).send({
      status: 200,
      message: "Success get all Bookmark",
      data: bookmark,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, Create New Bookmark Failed",
    });
  }
};

exports.getBookmarkByUserId = async (req, res) => {
  try {
    const bookmark = await Bookmark.findAll({
      where: {
        userId: req.idUser,
      },
      include: {
        model: Post,
        as: "Journey",
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId"],
        },
        include: {
          model: User,
          as: "User",
          attributes: ["fullName", "id"],
        },
      },
      attributes: ["id"],
    });

    res.status(200).send({
      status: 200,
      message: "Success get Bookmark by user id",
      data: bookmark,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, get Bookmark Failed",
    });
  }
};

exports.getBookmarkByPostId = async (req, res) => {
  try {
    const bookmark = await Bookmark.findAll({
      where: {
        postId: req.params.id,
      },
      include: [
        {
          model: User,
          as: "User",
          attributes: ["id", "fullName"],
        },
        {
          model: Post,
          as: "Journey",
          attributes: {
            exclude: ["createdAt", "updatedAt", "userId"],
          },
        },
      ],
      attributes: ["id"],
    });

    res.status(200).send({
      status: 200,
      message: "Success get Bookmark by post id",
      data: bookmark,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, Create New Bookmark Failed",
    });
  }
};

exports.checkBookmarkedPost = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      where: {
        postId: req.params.id,
        userId: req.idUser,
      },
      include: {
        model: Post,
        as: "Journey",
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId"],
        },
      },

      attributes: ["id"],
    });

    res.status(200).send({
      status: 200,
      message: "Success get Bookmark by post id",
      data: bookmark,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, Create New Bookmark Failed",
    });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const data = await Bookmark.findOne({
      where: {
        postId: req.params.id,
        userId: req.idUser,
      },
    });

    if (!data) {
      res.status(400).send({
        status: 400,
        message: `Bookmark with ID = ${req.params.id} is unavailable or has been deleted`,
      });
      return;
    }

    await Bookmark.destroy({
      where: {
        postId: req.params.id,
        userId: req.idUser,
      },
    });
    res.status(200).send({
      status: 200,
      message: "Success Delete Bookmark",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Server Error, Delete Bookmark Failed",
    });
  }
};
