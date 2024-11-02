export const generateDOCX = (resume) => {
    return `
        <h1>${resume.firstname} ${resume.surname}</h1>
        <h2>${resume.profession}</h2>
        <h3>Contact: ${resume.contact}</h3>
        <h4>Skills:</h4>
        <ul>${resume.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
        <h4>Education:</h4>
        <ul>${resume.education.map(edu => `<li>${edu}</li>`).join('')}</ul>
        <h4>Work History:</h4>
        <ul>${resume.workHistory.map(job => `<li>${job}</li>`).join('')}</ul>
        <h4>Awards:</h4>
        <ul>${resume.awards.map(award => `<li>${award}</li>`).join('')}</ul>
        <h4>Volunteering:</h4>
        <ul>${resume.volunteering.map(volunteer => `<li>${volunteer}</li>`).join('')}</ul>
        <h4>Activities:</h4>
        <ul>${resume.activities.map(activities => `<li>${activities}</li>`).join('')}</ul>
        <h4><u>Declaration</u>: <br/> ${resume.declaration}</h4>
    `;
};