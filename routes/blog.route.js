const {Router} = require('express');
const blogRoute = Router();
const blogController = require('../controllers/blog.controller');

blogRoute.get('/all', blogController.getAllBlogs);
blogRoute.post('/new', blogController.checkAuth, blogController.postBlog);
blogRoute.delete('/:blogID', blogController.checkAuth, blogController.deleteBlog);
blogRoute.put('/:blogID', blogController.checkAuth, blogController.updateBlog);
module.exports = blogRoute;