import Resume from "../models/resume.model.js";
import { errorHandler } from "../utils/error.js";
import { generatePDF } from "../utils/pdfGenerator.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import * as htmlDocx from 'html-docx-js';
import { generateDOCX } from "../utils/generateDOCX.js";
import cloudinary from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
    cloud_name: "ResumeBuilder",
    api_key: "782133944847463",
    api_secret: "B8HN6_RfkviRfOjz7gT2jaRkZ54",
});

export const createResume = async (req, res, next) => {
    const { firstname, surname, profession, contact, skills, education, workHistory, awards, volunteering, activities, declaration } = req.body;

    let img = null;
    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            img = result.secure_url;
        } catch (error) {
            return next(errorHandler(500, "Image upload failed..."));
        }
    }

    if (!firstname || !surname || !profession || !contact || !skills || !education || !workHistory || !awards || !volunteering || !activities || !declaration) {
        return next(errorHandler(400, "All fields are required..."));
    }

    try {
        const resume = new Resume({ firstname, surname, profession, contact, skills, education, workHistory, img, awards, volunteering, activities, declaration });
        await resume.save();

        const pdfPath = path.join(__dirname, '../uploads', `${resume._id}.pdf`);
        await generatePDF(resume, pdfPath);

        res.status(201).json({
            success: true,
            id: resume._id,
            message: "Resume added successfully.",
            resume,
            pdfPath,
        });
    } catch (error) {
        next(error);
    }
};

export const updateResume = async (req, res, next) => {
    const resumeId = req.params.id;

    try {
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return next(errorHandler(404, "Resume not found..."));
        }

        const { firstname, surname, profession, contact, skills, education, workHistory, awards, volunteering, activities, declaration } = req.body;

        let img = resume.img;
        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path);
                img = result.secure_url;
            } catch (error) {
                return next(errorHandler(500, "Image upload failed..."));
            }
        }

        if (firstname) {
            resume.firstname = firstname;
        }
        if (surname) {
            resume.surname = surname;
        }
        if (profession) {
            resume.profession = profession;
        }
        if (contact) {
            resume.contact = contact;
        }
        if (skills) {
            resume.skills = skills;
        }
        if (education) {
            resume.education = education;
        }
        if (workHistory) {
            resume.workHistory = workHistory;
        }
        if (awards) {
            resume.awards = awards;
        }
        if (volunteering) {
            resume.volunteering = volunteering;
        }
        if (activities) {
            resume.activities = activities;
        }
        if (declaration) {
            resume.declaration = declaration;
        }

        resume.img = img;
        await resume.save();

        res.status(200).json({
            success: true,
            message: "Resume updated successfully.",
            resume,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteResume = async (req, res, next) => {
    const resumeId = req.params.id;

    try {
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return next(errorHandler(404, "Resume not found..."));
        }

        await Resume.deleteOne({ _id: resumeId });
        res.status(200).json({
            success: true,
            message: "Resume deleted successfully.",
        });
    } catch (error) {
        next(error);
    }
};

export const getResumeById = async (req, res, next) => {
    const resumeId = req.params.id;
    try {
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return next(errorHandler(404, "Resume not found...."));
        }
        const pdfPath = path.join(__dirname, '../uploads', `${resumeId}.pdf`);
        generatePDF(resume, pdfPath);
        res.status(200).json({
            success: true,
            message: "Resume retrieved successfully.",
            resume,
            pdfPath,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllResumes = async (req, res, next) => {
    try {
        const resumes = await Resume.find({});
        res.status(200).json({
            success: true,
            message: "All resumes retrieved successfully.",
            resumes,
        });
    } catch (error) {
        next(error);
    }
};

export const generatePdf = async (req, res, next) => {
    const resumeId = req.params.id;
    const pdfPath = path.join(__dirname, "../uploads", `${resumeId}.pdf`);

    res.download(pdfPath, (err) => {
        if (err) {
            next(err);
        }
    });
};

export const exportResume = async (req, res, next) => {
    const resumeId = req.params.id;
    const format = req.query.format || 'pdf';

    try {
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return next(errorHandler(404, "Resume not found....."));
        }

        if (format === 'pdf') {
            const pdfPath = path.join(__dirname, "../uploads", `${resumeId}.pdf`);
            await generatePDF(resume, pdfPath);
            return res.status(201).json({
                success: true,
                message: "PDF generated successfully.",
                resumeId: resume._id,
                pdfPath,
            });
        } else if (format === 'docx') {
            const html = generateDOCX(resume);
            const docxPath = path.join(__dirname, "../uploads", `${resumeId}.docx`);

            const docxBlob = htmlDocx.asBlob(html);
            fs.writeFileSync(docxPath, Buffer.from(await docxBlob.arrayBuffer()));
            return res.status(201).json({
                success: true,
                message: "DOCX generated successfully.",
                resumeId: resumeId,
                docxPath,
            });
        } else {
            return next(errorHandler(400, "Unsupported format. Please use 'pdf' or 'docx'."));
        }
    } catch (error) {
        next(error);
    }
};
