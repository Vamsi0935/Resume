import express from "express";
import {
    createResume,
    deleteResume,
    exportResume,
    generatePdf,
    getAllResumes,
    getResumeById,
    updateResume
} from "../controllers/resume.controller.js";
import upload from "../utils/middleware/upload.js";

const router = express.Router();

router.post("/create", upload, createResume); // create resume
router.put("/update/:id", upload, updateResume); // update resume
router.delete("/delete/:id", deleteResume); // delete resume
router.get("/:id", getResumeById); // get resume by id
router.get("/", getAllResumes); // get all resumes
router.get("/download/:id", generatePdf); // download pdf
router.get("/:id/export", exportResume); // export pdf

export default router;
