const {
  getAllPosts,
  getPostByName,
  getPostById,
} = require("../../helpers/posts/posts.js");

const getPosts = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const post = await getPostByName(name);
      return res.status(200).json(post);
    } else {
      const allPosts = await getAllPosts();
      return res.status(200).json(allPosts);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await getPostById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = { getPosts, getById };