const Blog = require('../models/Blog.model'); 
const Token = require('../helpers/token');
const User = require('../models/User.model');

const getAllBlogs = async (req, res) => {
    try {
        const blogDocs = await Blog.find({});
        res.status(200).send({"msg":'ok', "blogs":blogDocs});
    } catch(err) {
        res.status(400).send({"msg":'nok', "err":err.message});
    }
}

const postBlog = async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).send({'msg':"ok", 'blogID' : blog._id});
    } catch(err) {
        res.status(400).send({"msg":'nok', "err":err.message});
    }
}

const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blogID);
        res.status(200).send({"msg":'ok', "blog":blog});
    } catch(err) {
        res.status(400).send({"msg":'nok', "err":err.message});
    }
}

const updateBlog = async (req, res) => {
    try {
        const blogID = req.params.blogID;
        if(!blogID) {throw new Error('no blog id!')}

        await Blog.findByIdAndUpdate(blogID, req.body);
        res.status(201).send({msg:'ok'});
    } catch(err) {
        res.status(400).send({"msg":'nok', "err":err.message});
    }
}

const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.blogID);
        res.status(201).send({'msg':"ok"});
    } catch(err) {
        res.status(400).send({"msg":'nok', "err":err.message});
    }
}

const checkAuth = async  (req, res, next) => {
    try {
        const token = req.query.token;
        if(!token) {
            throw new Error('Access forbidden | Invalid token');
        }
        const payload = Token.decodeToken(token);
        const adminUser = await User.findById(payload.userID);
        if(!adminUser) {
            throw new Error('Access forbidden | code:3369');
        }

        if(adminUser.accessLvL !== 'root' && adminUser.accessLvL !== 'mid') {
            throw new Error('Access forbidden : code:3371');
        }
        next();
    } catch(err) {
        res.status(400).send({"msg":'nok', "err":err.message});
    }
}

module.exports = {
    postBlog,
    deleteBlog,
    getAllBlogs,
    checkAuth,
    updateBlog,
    getBlog
}