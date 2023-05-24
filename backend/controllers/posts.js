const pool = require("../models/db");

const createNewPost = (req, res) => {
  const userId = req.token.userId;

  const { title, description, pricing, post_image } = req.body;

  pool
    .query(
      `INSERT INTO posts (title, description, user_id, pricing,post_image) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [title, description, userId, pricing, post_image]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "post created",
        post: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
const getPostsByuser = (req, res) => {
  const user_id = req.token.userId;
  pool
    .query(`SELECT * FROM posts WHERE user_id = ${user_id}`)
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "get all posts from one user",
        posts: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
const getPostsById = (req, res) => {
  const post_id = req.params.post_id;
  pool
    .query(`SELECT * FROM posts WHERE id = ${post_id}`)
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "get post",
        posts: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error*",
        err: err.message,
      });
    });
};
const updatePostById = (req, res) => {
  const id = req.params.postId;
  const { title, description, pricing } = req.body;
  const data = [title || null, description || null, pricing || null, id];
  const query = `UPDATE posts SET title = COALESCE($1,title), description = COALESCE($2,description), pricing =COALESCE($3,pricing) WHERE id = $4 RETURNING *;`;

  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "[post updated]",
        posts: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
const deletePostById = (req, res) => {
  const postId = req.params.id;
  const queryString = `DELETE FROM posts WHERE id = ${postId}`;

  pool
    .query(queryString)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: `Post with id: ${postId} deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err,
      });
    });
};

const getAllPosts = (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const offset = (page - 1) * limit;
  // const newQ=`SELECT u.first_name, u.last_name,u.user_image,p.user_id, p.description, p.pricing, p.title, p.created_on ,p.post_image ,p.id FROM posts p INNER JOIN users u ON u.id = p.user_id ORDER BY p.id ASC LIMIT $1 OFFSET $2`
  const newQ=`SELECT u.first_name, u.last_name, u.user_image, p.user_id, p.description, p.pricing, p.title, p.created_on ,p.post_image, p.id, c.name FROM posts p INNER JOIN users u ON u.id = p.user_id INNER JOIN crafts c ON u.craft_id = c.id ORDER BY p.id ASC LIMIT $1 OFFSET $2`
  const queryString = `SELECT * FROM posts ORDER BY id ASC LIMIT $1 OFFSET $2`;
const query =`SELECT u.first_name, u.last_name, u.user_image, p.user_id, p.pricing, p.title, p.post_image, p.id, c.name
FROM posts p 
INNER JOIN users u ON u.id = p.user_id
INNER JOIN crafts c ON u.craft_id = c.id  LIMIT $1 OFFSET $2`
  const queryStringForCount =
   `SELECT COUNT(*) FROM posts`;

  const placeholder = [limit, offset];

  pool
    .query(queryStringForCount)
    .then((result) => {
      const count = parseInt(result.rows[0].count);
      const totalPages = Math.ceil(count / limit);
      pool
        .query(query, placeholder)
        .then((result) => {
          const posts = result.rows;
          res.status(200).json({
            success: true,
            massage: "all posts",
            posts: result.rows,
            totalPages: totalPages,
            currentPage: page,
            posts,
          });
         
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Server error",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err,
      });
    });
};


const getAllPostsByPricDesc = (req, res) => {
  
  pool
    .query(`SELECT u.first_name, u.last_name, u.user_image, p.user_id, p.description, p.pricing, p.title, p.created_on ,p.post_image, p.id, c.name FROM posts p INNER JOIN users u ON u.id = p.user_id INNER JOIN crafts c ON u.craft_id = c.id ORDER BY pricing DESC`)
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "get post",
        posts: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error*",
        err: err.message,
      });
    });
};
const getAllPostsByPricAsc = (req, res) => {
  pool
    .query(`SELECT u.first_name, u.last_name, u.user_image, p.user_id, p.description, p.pricing, p.title, p.created_on ,p.post_image, p.id, c.name FROM posts p INNER JOIN users u ON u.id = p.user_id INNER JOIN crafts c ON u.craft_id = c.id ORDER BY pricing ASC`)
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "get post",
        posts: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error*",
        err: err.message,
      });
    });
};
const getAllPostsByDate = (req, res) => {
  pool
    .query(`SELECT u.first_name, u.last_name, u.user_image, p.user_id, p.description, p.pricing, p.title, p.created_on ,p.post_image, p.id, c.name FROM posts p INNER JOIN users u ON u.id = p.user_id INNER JOIN crafts c ON u.craft_id = c.id ORDER BY created_on DESC`)
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "get post",
        posts: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error*",
        err: err.message,
      });
    });
};
const getAllPostsBySearch = (req, res) => {
  const value = req.params.value;
  pool
    .query(`SELECT u.first_name, u.last_name, u.user_image, p.user_id, p.description, p.pricing, p.title, p.created_on ,p.post_image, p.id, c.name FROM posts p INNER JOIN users u ON u.id = p.user_id INNER JOIN crafts c ON u.craft_id = c.id WHERE LOWER(title) LIKE LOWER('%${value}%')`)
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "get post",
        posts: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error*",
        err: err.message,
      });
    });
};

module.exports = {
  createNewPost,
  getPostsByuser,
  updatePostById,
  deletePostById,
  getAllPosts,
  getPostsById,
  getAllPostsByPricDesc,
  getAllPostsByPricAsc,
  getAllPostsByDate,
  getAllPostsBySearch
};
