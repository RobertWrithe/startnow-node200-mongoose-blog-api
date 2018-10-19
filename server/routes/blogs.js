const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req, res) => {
    Blog
        .where({ blogs: 'featured' })
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(err => {
            res.status(500).send('An internal server error has occured')
        });
});

router.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id)
        .then(blogs => {
            (blogs ? res.status(200).json(blogs) : res.status(404).send())
        })
        .catch(err => {
            res.status(500).send('An internal server error has occured')
        });
});


router.post('/', (req, res) => {
    let dbUser = null;

    User
        .findById(req.body.author)
        .then(user => {
            // Create a blog
            const newBlog = new Blog(req.body);

            // Bind the user ot it
            newBlog.author = user._id;

            // Save it to the database
            return newBlog.save();
        })
        .then(blog => {
            // Push the saved blog to the array of blogs associated with the User
            dbUser.blogs.push(blog);

            // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
            dbUser.save().then(() => res.status(201).json(blog));
        });
});

router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(blogs => {
            res.status(204).json(blogs);
        });
});

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndDelete(req.params.id)
        .then(blogs => {
            res.status(200).json(blogs);
        });
});


module.exports = router;