const { Bookmark, User, Post } = require("../../models");

exports.addBookmark = async (req, res) => {
  try {
    const { body } = req;
    const newBody = {
      ...body,
      userId: req.idUser,
    };
    const data = await Bookmark.create(newBody);
    const bookmarkAdded = await Bookmark.findOne({
      where: { id: data.id },
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
            exclude: ["updatedAt", "createdAt", "userId"],
          },
        },
      ],
    });

    res.status(200).send({
      status: 200,
      message: "Success Added New Bookmark",
      data: bookmarkAdded,
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
      message: "Success Added New Bookmark",
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
      message: "Success Added New Bookmark",
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
      message: "Success Added New Bookmark",
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
      where: { id: req.params.id },
    });

    if (!data) {
      res.status(400).send({
        status: 400,
        message: `Bookmark with ID = ${req.params.id} is unavailable or has been deleted`,
      });
      return;
    }

    await Post.destroy({
      where: { id: req.params.id },
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
