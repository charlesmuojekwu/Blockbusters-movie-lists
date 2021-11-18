const Post = require('../models/posts')
const fs = require('fs')

module.exports = class API {
    // fetch all post
    static async fetchAllPost(req,res) {
        await Post.find()
         .then((result) => {
             res.status(200).json(result)
         })
         .catch((err) => {
             res.status(404).json({ message: err.message })
         })
    }

    // fetch post by id
    static async fetchPostByID(req,res) {
        const id = req.params.id
        await Post.findById(id)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(404).json({ messgae : err.message})
            })
    }

    // create a post
    static async createPost(req,res) {
        const posts = req.body
        const imagename = req.file.filename
        posts.image = imagename

        await Post.create(posts)
            .then(() => {
                res.status(200).json({ message: " Post Created succefully" })
            })
            .catch((err) => {
                res.status(400).json({ message : err.message })
            })

    }

    // Update a post
    static async updatePost(req,res) {
        const id = req.params.id
        let new_image = ""
        if(req.file){
            new_image = req.file.filename
            try{
                fs.unlinkSync('./uploads/' + req.body.old_image)
            }catch(err){
                console.log(err.message)
            }
        }else{
            new_image = req.body.old_image
        }

        const newPost = req.body
        newPost.image = new_image

        await Post.findByIdAndUpdate(id,newPost,{useFindAndModify:false})
         .then(() => {
             res.status(200).json({ message : 'post update successfully'})
         })
         .catch((err) => {
            res.status(200).json({ message : err.message})
         })
    }

    //Delete post
    static async deletePost(req,res) {
       const id = req.params.id
       await Post.findByIdAndDelete(id)
        .then((result) => {
            if(result.image != ''){
                fs.unlinkSync('./uploads/' + result.image)
            }
            res.status(200).json({ message : 'post deleted successfully'})
        })
        .catch((err) => {
            res.status(404).json({ message : err.message})
        })
    }
}