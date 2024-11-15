import mongoose from "mongoose";

const basicInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
});

const workHistorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    certificationLink: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    points: {
        type: String,
        required: false,
    }
});

const projectSchmea = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        required: true,
    }
});

const educationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
});

const achievementSchema = new mongoose.Schema({
    points: {
        type: String,
        required: true,
    }
});

const summarySchema = new mongoose.Schema({
    summary: {
        type: String,
        required: true,
    }
});

const otherSchema = new mongoose.Schema({
    other: {
        type: String,
        required: true,
    }
})

const ResumeSchema = new mongoose.Schema(
    {
        basicInfo: [basicInfoSchema],
        workHistory: [workHistorySchema],
        projects: [projectSchmea],
        education: [educationSchema],
        achievement: [achievementSchema],
        summary: [summarySchema],
        other: [otherSchema],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
);

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
