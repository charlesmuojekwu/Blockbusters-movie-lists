const { model, Schema } = require('mongoose')

const PostSchema = new Schema ({
    title : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    image : {
        type : String
    }
},{timestamps : true})

module.exports = model('post',PostSchema)