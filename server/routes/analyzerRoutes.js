const express = require("express");
const { GoogleGenAI, Type } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


// =========================================================
// ANALYZE RESUME
// =========================================================

router.post("/analyze", async (req, res) => {

    try {

        const {
            resumeText,
            jobTitle,
            companyName,
            jobDescription
        } = req.body;


        // -----------------------------------------------------
        // VALIDATION
        // -----------------------------------------------------

        if (!resumeText || !resumeText.trim()) {
            return res.status(400).json({
                message: "Resume text is required."
            });
        }

        if (!jobTitle || !jobTitle.trim()) {
            return res.status(400).json({
                message: "Job title is required."
            });
        }

        if (!jobDescription || !jobDescription.trim()) {
            return res.status(400).json({
                message: "Job description is required."
            });
        }


        // -----------------------------------------------------
        // PROMPT
        // -----------------------------------------------------

        const prompt = `
You are an expert ATS resume analyzer and career assistant.

Analyze the candidate's resume against the target job.

IMPORTANT:
- Evaluate only the information present in the resume.
- Do not invent experience, skills, education, certifications, or achievements.
- Compare the resume with the job description.
- Give practical and specific feedback.
- ATS score should be from 0 to 100.
- Keyword match should be based on meaningful job-related keywords.
- Distinguish between skills that are present and skills that are missing.
- Do not penalize a candidate simply because a keyword is absent if an equivalent skill is clearly present.
- Consider ATS readability, structure, skills, experience, education, and keyword relevance.

TARGET JOB

Job Title:
${jobTitle}

Company:
${companyName || "Not provided"}

Job Description:
${jobDescription}


CANDIDATE RESUME

${resumeText}


Return a complete ATS analysis using the required JSON structure.
`;


        // -----------------------------------------------------
        // GEMINI REQUEST
        // -----------------------------------------------------

        const response = await ai.models.generateContent({

            model: "gemini-3.6-flash",

            contents: prompt,

            config: {

                temperature: 0.2,

                responseMimeType: "application/json",

                responseSchema: {

                    type: Type.OBJECT,

                    properties: {

                        atsScore: {
                            type: Type.NUMBER,
                            description: "Overall ATS compatibility score from 0 to 100."
                        },

                        keywordMatch: {
                            type: Type.NUMBER,
                            description: "Percentage of relevant job keywords matched by the resume, from 0 to 100."
                        },

                        summary: {
                            type: Type.STRING,
                            description: "Short overall assessment of the resume against the job."
                        },

                        strengths: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            }
                        },

                        weaknesses: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            }
                        },

                        matchedKeywords: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            }
                        },

                        missingKeywords: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            }
                        },

                        matchedSkills: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            }
                        },

                        missingSkills: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            }
                        },

                        formattingIssues: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            }
                        },

                        suggestions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            }
                        }

                    },

                    required: [
                        "atsScore",
                        "keywordMatch",
                        "summary",
                        "strengths",
                        "weaknesses",
                        "matchedKeywords",
                        "missingKeywords",
                        "matchedSkills",
                        "missingSkills",
                        "formattingIssues",
                        "suggestions"
                    ]

                }

            }

        });


        // -----------------------------------------------------
        // PARSE GEMINI RESPONSE
        // -----------------------------------------------------

        const analysisText = response.text;

        if (!analysisText) {
            return res.status(500).json({
                message: "Gemini returned an empty response."
            });
        }


        let analysis;

        try {

            analysis = JSON.parse(analysisText);

        } catch (parseError) {

            console.error(
                "Failed to parse Gemini JSON:",
                parseError.message
            );

            console.error(
                "Gemini response:",
                analysisText
            );

            return res.status(500).json({
                message: "Gemini returned invalid analysis data."
            });

        }


        // -----------------------------------------------------
        // SEND RESULT TO FRONTEND
        // -----------------------------------------------------

        res.status(200).json({
            success: true,
            analysis
        });


    } catch (error) {

        console.error(
            "Resume analysis error:",
            error
        );

        res.status(500).json({
            message: "Failed to analyze resume.",
            error: error.message
        });

    }

});


module.exports = router;