import express from "express";
const app = express();




app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Welcome to api"
    });
});


app.listen(8080,()=>{
    console.log("Server is running at 8080");
})


