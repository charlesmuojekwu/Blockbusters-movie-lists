const express = require('express')
const router = express.Router()
const multer = require('multer')
const { 
    fetchAllPost,
    fetchPostByID,
    createPost,
    updatePost,
    deletePost } = require('../controllers/api_controller')

//multer middleware to upload image
let storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"./uploads")
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})

let upload = multer({
    storage : storage,
}).single("image")

router.get('/',fetchAllPost)
router.get('/:id',fetchPostByID)
router.post('/', upload, createPost)
router.patch('/:id', upload, updatePost)
router.delete('/:id',deletePost)



module.exports = router