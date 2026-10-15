const express = require("express");
const Resume = require("../models/Resume");

const router = express.Router();

// Create a new resume
router.post("/", async (req, res) => {
    try {
        const resume = await Resume.create(req.body);

        res.status(201).json(resume);
    } catch (error) {
        console.error("Error creating resume:", error.message);

        res.status(500).json({
            message: "Failed to create resume"
        });
    }
});


// Get all resumes
router.get("/", async (req, res) => {
    try {
        const resumes = await Resume.find().sort({
            updatedAt: -1
        });

        res.status(200).json(resumes);
    } catch (error) {
        console.error("Error fetching resumes:", error.message);

        res.status(500).json({
            message: "Failed to fetch resumes"
        });
    }
});


// Get one resume by ID
router.get("/:id", async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        res.status(200).json(resume);
    } catch (error) {
        console.error("Error fetching resume:", error.message);

        res.status(500).json({
            message: "Failed to fetch resume"
        });
    }
});


// Update a resume
router.put("/:id", async (req, res) => {
    try {
        const resume = await Resume.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        res.status(200).json(resume);
    } catch (error) {
        console.error("Error updating resume:", error.message);

        res.status(500).json({
            message: "Failed to update resume"
        });
    }
});


// Delete a resume
router.delete("/:id", async (req, res) => {
    try {
        const resume = await Resume.findByIdAndDelete(req.params.id);

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        res.status(200).json({
            message: "Resume deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting resume:", error.message);

        res.status(500).json({
            message: "Failed to delete resume"
        });
    }
});


module.exports = router;