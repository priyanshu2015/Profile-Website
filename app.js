var express=require("express");
var app=express();
var port=3000;
var bodyParser=require('body-parser');
let path=require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


var mongoose=require("mongoose");
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/new2");
var nameSchema=new mongoose.Schema({
    name:String,
    password:String,
    gender:String,
    age:String,
    email:String,
    contact:String
});
var User=mongoose.model("User",nameSchema);


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/welcome.html");
});
app.get("/signup.html",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})
app.get("/signin.html",(req,res)=>{
    res.sendFile(path.join(__dirname+"/signin.html"))==[];
})
app.get("/profile.html",(req,res)=>{
    res.sendFile(__dirname+"/profile.html");
})
app.get("/Canvas.html",(req,res)=>{
    res.sendFile(__dirname+"/Canvas.html");
})


app.post("/login.html", (req, res) => {
    User.findOne({name: req.body.name},(err, user) =>{
        if (err) {

            console.log('Signup error');
            return next(err);
        }
        //if user found.
          if(user){
            res.send('Username already exists');                         
             } 
             
            
          else{
                var myData = new User(req.body);
                myData.save()
                .then(item => {
                res.send("item saved to database");
                })
                .catch(err => {
                res.status(400).send("unable to save to database");
                });
            }     
   });});
   app.post("/sign", (req, res) => {
    User.findOne({name: req.body.username},(err, user) =>{
        if (err) {

            console.log('Signin error');
            return next(err);
        }
        //if user found.
          if(user){
              if(user.password==req.body.password){
            res.send('You have successfully logined');}
            else{
                res.send('password is wrong');
            }                         
             } 
             
            
          else{
                res.send('please first signup');
            }     
   });});
   app.listen(port, () => {
    console.log("Server listening on port " + port);
   });