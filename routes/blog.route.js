const {Router} = require('express');
const blogRoute = Router();
const blogController = require('../controllers/blog.controller');

blogRoute.get('/all/blogs', blogController.getAllBlogs);
blogRoute.get('/:blogID', blogController.getBlog);

blogRoute.delete('/:blogID', blogController.checkAuth, blogController.deleteBlog);
blogRoute.put('/:blogID', blogController.checkAuth, blogController.updateBlog);

blogRoute.post('/new', blogController.checkAuth, blogController.postBlog);


module.exports = blogRoute;