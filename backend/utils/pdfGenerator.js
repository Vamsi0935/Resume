import PDFDocument from "pdfkit"
import fs from "fs"

export const generatePDF = (resume, pdfPath) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(25).text(`${resume.firstname} ${resume.surname}`, { align: 'center' })
    doc.moveDown();

    doc.fontSize(18).text(`Profession: ${resume.profession}`);
    doc.moveDown();

    doc.fontSize(16).text(`Contact: ${resume.contact}`);
    doc.moveDown();

    doc.fontSize(16).text('Skills:');
    resume.skills.forEach(skill => doc.text(`- ${skill}`));
    doc.moveDown();

    doc.fontSize(16).text('Education:');
    resume.education.forEach(education => doc.text(`- ${education}`));
    doc.moveDown();

    doc.fontSize(16).text('Work History:');
    resume.workHistory.forEach(job => doc.text(`- ${job}`));
    doc.moveDown();

    doc.fontSize(16).text('Awards:');
    resume.awards.forEach(award => doc.text(`- ${award}`));
    doc.moveDown();

    doc.fontSize(16).text('Volunteering:');
    resume.volunteering.forEach(volunteer => doc.text(`- ${volunteer}`));
    doc.moveDown();

    doc.fontSize(16).text('Acitivities:');
    resume.activities.forEach(activities => doc.text(`- ${activities}`));
    doc.moveDown();

    doc.fontSize(16).text(`Declaration: ${resume.declaration}`);

    doc.end();
}