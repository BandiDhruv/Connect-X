import "dotenv/config";
import mongoose from "mongoose";
import env from "./util/validateEnv";
import userRoutes from "./routes/user"
import session from "express-session";
import express from "express";
import createHttpError from "http-errors";
import MongoStore from "connect-mongo";
const app=express();
app.use(express.json());
app.use(session({
    secret:env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:60*60*1000,
    },
    rolling:true,
    store:MongoStore.create({
        mongoUrl:env.MONGO_CONNECTION_STRING
    }),
}));
app.use("/api/users",userRoutes);
app.get("/",(req,res)=>{
    res.send("hello world");
});
app.use((req,res,next)=>{
    next(createHttpError(404,"EndPoint Not Found"));
})
const port=env.PORT;


mongoose.connect(env.MONGO_CONNECTION_STRING)
.then(()=>{
    console.log("Mongoose Connected");    
    app.listen(port,()=>{
        console.log(`server is running at http://localhost:${port}`);
        });
}).catch(console.error)

