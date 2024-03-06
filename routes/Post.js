const router = require("express").Router();
const Post = require('../model/Post');

// Add Post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// edit post 
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const premium = await Post.findByIdAndUpdate(id, req.body)
        if (!premium) {
            res.status(403).json({ message: `cannot find any product with id ${id}` })
        }
        const updatedPremium = await Post.findById(id);
        res.status(200).json(updatedPremium);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})

// delete post
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const premium = await Post.findByIdAndDelete(id)
        if (!premium) {
            res.status(403).json({ message: `cannot find any product with id ${id}` })
        }
        const updatedPremium = await Post.findById(id);
        res.status(200).json(updatedPremium);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})

// get all
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) // ||1 Default to page 1 if not specified
        const pageSize = parseInt(req.query.pageSize) // || 10   Default page size to 10 if not specified
        const skip = (page - 1) * pageSize;

        const totalRelatedPosts = await Post.countDocuments();

        const totalPages = Math.ceil(totalRelatedPosts / pageSize);

        const post = await Post.find({}).sort({ createdAt: -1 }) // Sorting by createdAt in descending order
            .skip(skip)
            .limit(pageSize);;
        res.status(200).json({
            data: post,
            page: page || 0,
            limit: pageSize || 0,
            total_pages: totalPages || 0,
            total_data: totalRelatedPosts,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

// Get a single item by ID
router.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id; // Extract the item ID from the URL parameter
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/list/latest', async (req, res) => {
    try {
        const post = await Post.find({});
        post.reverse() // we are reversing the array so the latest one appear first 
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Get a single item by SEO title
router.get('/seotitle/:engtitle', async (req, res) => {
    try {
        const seoTitle = req.params.engtitle; // Extract the SEO title from the URL parameter
        const post = await Post.findOne({ engtitle: seoTitle });

        if (!post) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router