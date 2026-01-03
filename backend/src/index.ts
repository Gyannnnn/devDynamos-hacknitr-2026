import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import collegeRouter from "./routes/college.routes";
import mentorRouter from "./routes/mentor.routes";

const app = express();

// CORS middleware - this handles preflight automatically
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/college", collegeRouter);
app.use("/api/v1/mentor", mentorRouter);

app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
    console.log("CORS enabled for http://localhost:3000");
});