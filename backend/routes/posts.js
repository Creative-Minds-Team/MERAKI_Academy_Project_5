const express = require("express");
const authentication=require('../middleware/authentication')
const authorization=require('../middleware/authorization')
const {
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
} = require("../controllers/posts");

const postsRouter = express.Router();

postsRouter.post('/',authentication,createNewPost)
postsRouter.get('/user/myposts',authentication,getPostsByuser)
postsRouter.put('/:postId',authentication,updatePostById)
postsRouter.delete("/:id", authentication, deletePostById)
postsRouter.get('/',getAllPosts)
postsRouter.get(`/post/:post_id`,getPostsById)
postsRouter.get(`/fillter/desc`,getAllPostsByPricDesc)
postsRouter.get(`/fillter/asc`,getAllPostsByPricAsc)
postsRouter.get(`/fillter/date`,getAllPostsByDate)
postsRouter.get(`/search/:value`,getAllPostsBySearch)


module.exports = postsRouter;
