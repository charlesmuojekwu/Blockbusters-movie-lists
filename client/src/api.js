import axios from "axios"
const url = "/api/posts"

export default class API {
    // get all the post from the server
    static async getAllPost(){
        const res = await axios.get(url)
        return res.data
    }

    // get single post from the server by id
    static async getPostById(id){
        const res = await axios.get(`${url}/${id}`)
        return res.data
    }

     // to send post to the 
     static async addPost(post){
        const res = await axios.post(url , post)
        return res.data
    }

     // update post to the server 
     static async updatePost(id,post){
        const res = await axios.patch(`${url}/${id}`,post)
        return res.data
    }

    // delete a post from the server by id
    static async deletePostById(id){
        const res = await axios.delete(`${url}/${id}`)
        return res.data
    }
}