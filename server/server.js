const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const resumeRoutes = require("./routes/resumeRoutes");
const analyzerRoutes = require("./routes/analyzerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/resumes", resumeRoutes);
app.use("/api/analyzer", analyzerRoutes);

app.get("/", (req, res) => {
    res.send("ResumePilot Backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});