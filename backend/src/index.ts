import express from "express";
import authRouter from "./routes/auth.routes";
import collegeRouter from "./routes/college.routes";
import mentorRouter from "./routes/mentor.routes";
const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to api"
    });
});

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/college", collegeRouter)
app.use("/api/v1/mentor",mentorRouter);


app.listen(8080, () => {
    console.log("Server is running at 8080");
})


