
const express = require("express");
const router = express.Router();
//post
//index

router.get("/",(req,res)=>{
    res.send("GET for  post")
});

//show-posts
router.get("/:id",(req,res)=>{
    res.send("GET for post id")
});

//post-posts
router.post("/",(req,res)=>{
    res.send("post for posts")
});

//delete-posts
router.delete("/:id",(req,res)=>{
    res.send("delete for posts id")
});



module.exports = router;