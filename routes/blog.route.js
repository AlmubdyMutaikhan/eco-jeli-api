const {Router} = require('express');
const blogRoute = Router();
const blogController = require('../controllers/blog.controller');


blogRoute.post('/new', blogController.checkAuth, blogController.postBlog);
blogRoute.delete('/:blogID', blogController.checkAuth, blogController.deleteBlog);
blogRoute.put('/:blogID', blogController.checkAuth, blogController.updateBlog);
blogRoute.get('/:blogID', blogController.checkAuth, blogController.getBlog);
blogRoute.get('/all', blogController.getAllBlogs);

module.exports = blogRoute;