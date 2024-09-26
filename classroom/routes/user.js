
const express = require("express");
const router = express.Router();
//post
//user
//index

router.get("/",(req,res)=>{
    res.send("GET for  users")
})

//show-user
router.get("/:id",(req,res)=>{
    res.send("GET for user id")
})

//post-user
router.post("/",(req,res)=>{
    res.send("post for users")
})

//delete-user
router.delete("/:id",(req,res)=>{
    res.send("delete for user id")
})

module.exports= router;
