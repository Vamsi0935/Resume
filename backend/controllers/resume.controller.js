import Resume from "../models/resume.model.js";
import { errorHandler } from "../utils/error.js";
import { generatePDF } from "../utils/pdfGenerator.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import * as htmlDocx from 'html-docx-js';
import { generateDOCX } from "../utils/generateDOCX.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createResume = async (req, res, next) => {
    const {
        basicInfo,
        workExp = [],
        project = [],
        education = [],
        achievement = [],
        summary,
        other
    } = req.body;

    let img = null;
    if (req.file) {
        const imgPath = path.join(__dirname, '../uploads', req.file.filename);
        img = imgPath;
    }

    if (!basicInfo || !summary || !other) {
        return next(errorHandler(400, "All fields are required..."));
    }

    try {
        const resume = new Resume({ basicInfo, workExp, project, education, achievement, summary, other, img });
        await resume.save();

        const fileName = `${resume._id}.pdf`;
        const pdfPath = path.join(__dirname, '../uploads', fileName);
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

        const {
            basicInfo,
            workExp = [],
            project = [],
            education = [],
            achievement = [],
            summary,
            other
        } = req.body;

        let img = resume.img;
        if (req.file) {
            const imgPath = path.join(__dirname, '../uploads', req.file.filename);
            img = imgPath;
        }

        if (basicInfo) resume.basicInfo = basicInfo;
        if (workExp) resume.workExp = workExp;
        if (project) resume.project = project;
        if (education) resume.education = education;
        if (achievement) resume.achievement = achievement;
        if (summary) resume.summary = summary;
        if (other) resume.other = other;

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

        const fileName = `${resume._id}.pdf`;
        const pdfPath = path.join(__dirname, '../uploads', fileName);
        await generatePDF(resume, pdfPath);

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
    const resume = await Resume.findById(resumeId);
    if (!resume) {
        return next(errorHandler(404, "Resume not found..."));
    }

    const fileName = `${resume._id}.pdf`;
    const pdfPath = path.join(__dirname, "../uploads", fileName);

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

        const fileName = `${resume._id}`;

        if (format === 'pdf') {
            const pdfPath = path.join(__dirname, "../uploads", `${fileName}.pdf`);
            await generatePDF(resume, pdfPath);
            return res.status(201).json({
                success: true,
                message: "PDF generated successfully.",
                resumeId: resume._id,
                pdfPath,
            });
        } else if (format === 'docx') {
            const html = generateDOCX(resume);
            const docxPath = path.join(__dirname, "../uploads", `${fileName}.docx`);

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
