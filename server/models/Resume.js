const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            default: ""
        },
        jobTitle: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        linkedin: {
            type: String,
            default: ""
        },
        github: {
            type: String,
            default: ""
        },
        portfolio: {
            type: String,
            default: ""
        }
    },
    { _id: false }
);

const resumeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "Untitled Resume"
        },

        personal_info: {
            type: personalInfoSchema,
            default: () => ({})
        },

        professional_summary: {
            type: String,
            default: ""
        },

        experience: {
            type: Array,
            default: []
        },

        education: {
            type: Array,
            default: []
        },

        skills: {
            type: Array,
            default: []
        },

        projects: {
            type: Array,
            default: []
        },

        template: {
            type: String,
            default: "classic"
        },

        accent_color: {
            type: String,
            default: "#3B82F6"
        },

        public: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;