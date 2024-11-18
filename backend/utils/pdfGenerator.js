import PDFDocument from "pdfkit";
import fs from "fs";

export const generatePDF = (resume, pdfPath) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));

    const { name } = resume.basicInfo || {};
    doc.fontSize(25).text(`${name}`, { align: 'center' });
    doc.moveDown();

    if (resume.summary) {
        doc.fontSize(18).text('Summary:', { underline: true });
        doc.fontSize(16).text(resume.summary);
        doc.moveDown();
    }

    if (resume.basicInfo) {
        doc.fontSize(18).text('Basic Info:', { underline: true });
        for (const [key, value] of Object.entries(resume.basicInfo)) {
            if (key !== "firstname" && key !== "surname") {
                doc.fontSize(16).text(`${key}: ${value}`);
            }
        }
        doc.moveDown();
    }

    const workExp = resume.workExp || [];
    if (workExp.length > 0) {
        doc.fontSize(18).text('Work History:', { underline: true });
        workExp.forEach(job => doc.fontSize(16).text(`- ${job}`));
        doc.moveDown();
    }

    const project = resume.project || [];
    if (project.length > 0) {
        doc.fontSize(18).text('project:', { underline: true });
        project.forEach(project => doc.fontSize(16).text(`- ${project}`));
        doc.moveDown();
    }

    const education = resume.education || [];
    if (education.length > 0) {
        doc.fontSize(18).text('Education:', { underline: true });
        education.forEach(edu => doc.fontSize(16).text(`- ${edu}`));
        doc.moveDown();
    }

    const achievement = resume.achievement || [];
    if (achievement.length > 0) {
        doc.fontSize(18).text('Achievements:', { underline: true });
        achievement.forEach(ach => doc.fontSize(16).text(`- ${ach}`));
        doc.moveDown();
    }

    if (resume.other) {
        doc.fontSize(18).text('Other Information:', { underline: true });
        doc.fontSize(16).text(resume.other);
        doc.moveDown();
    }

    if (resume.declaration) {
        doc.fontSize(16).text(`Declaration: ${resume.declaration}`);
        doc.moveDown();
    }

    doc.end();
};
