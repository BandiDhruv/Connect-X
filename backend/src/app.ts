import "dotenv/config";
import env from "./util/validateEnv";
import userRoutes from "./routes/user"
import session from "express-session";
import express, {  Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import MongoStore from "connect-mongo";
import  cors from "cors";
import morgan from "morgan";


const app=express();
app.use(morgan("dev"));
app.use(express.json());
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));
const corsOpts = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts));

app.use("/api/users",userRoutes);
app.use((req,res,next)=>{
    next(createHttpError(404,"EndPoint Not Found"));
})

app.use((error: unknown, req: Request, res: Response) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;