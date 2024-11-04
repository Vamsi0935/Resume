import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    websiteLinks: [
        {
            linkedIn: {
                type: String,
                required: false,
            },
            gitHub: {
                type: String,
                required: false,
            }
        }
    ]
});

const skillsSchema = new mongoose.Schema({
    skillName: {
        type: String,
        required: true,
    },
    proficiency: {
        type: String,
        enum: ["Beginner", "Intermediate", "Expert"],
        required: true,
    },
});

const educationSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true,
    },
    schoolLocation: {
        type: String,
        required: false,
    },
    degree: {
        type: String,
        required: false,
    },
    stream: {
        type: String,
        required: false,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
});

const workHistorySchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: false,
    },
    responsibilities: {
        type: [String],
        required: true,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
});

const awardSchema = new mongoose.Schema(
    {
        awardName: {
            type: String,
            required: false,
        },
        awardedBy: {
            type: String,
            required: false,
        },
        date: {
            type: Date,
            required: false,
        }
    }
)

const volunteerSchema = new mongoose.Schema({
    organization: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: false,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
});

const activitySchema = new mongoose.Schema(
    {
        involvements: {
            type: String,
            required: false,
        },
        achievements: {
            type: String,
            required: false,
        },
    }
)

const ResumeSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        profession: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: false,
        },
        img: {
            type: String,
            required: false,
        },
        contact: [contactSchema],
        skills: [skillsSchema],
        education: [educationSchema],
        workHistory: [workHistorySchema],
        awards: [awardSchema],
        volunteering: [volunteerSchema],
        activities: [activitySchema],
        declaration: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
);

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
