const express= require ("express");
const app= express();
const users = require("./routes/user.js")
const posts = require("./routes/post.js")
const session= require("express-session");
const flash = require("connect-flash");
const path = require ("path");

const sessionOptions={
        secret: 'mysupersecreatstring',
        resave: false,
        saveUninitialized: true,
  }


app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
  res.locals.successmsg =req.flash("success");
    res.locals.Errormsg =req.flash("Error");
    next();
});


app.get("/register",(req,res)=>{
    let{name="anonymous"}= req.query;
   req.session.name = name;
   
   if (name=="anonymous"){
    req.flash("Error","user not registered !");
   }
   else{
    req.flash("success","user registered successfully !");
   }
   res.redirect("/hello");
});

  app.get("/hello",(req,res)=> {
    res.render("page.ejs",{name: req.session.name });
  });

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count ++; 
//     }else{
//     req.session.count=1;
//     }
//     res.send(`you sent a request ${req.session.count} times`);
// });

//   app.get("/test",(req,res) => {
//     res.send("test successful!");
//   })

app.listen(3000,()=>{
    console.log("server is listing to 3000");

});