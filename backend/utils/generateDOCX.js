export const generateDOCX = (resume) => {
    return `
        <h1>${resume.basicInfo?.name}</h1>
        <h2>${resume.profession || 'Not provided'}</h2>

        <h3>Contact:</h3>
        <p>Email: ${resume.basicInfo?.email || 'Not provided'}</p>
        <p>Phone: ${resume.basicInfo?.phone || 'Not provided'}</p>
        <p>Address: ${resume.basicInfo?.address || 'Not provided'}</p>

        <h3>Summary:</h3>
        <p>${resume.summary || 'No summary provided.'}</p>

        <h3>Basic Info:</h3>
        <ul>
            ${Object.entries(resume.basicInfo || {}).map(([key, value]) => {
        if (key !== 'firstname' && key !== 'surname') {
            return `<li><strong>${key}:</strong> ${value}</li>`;
        }
        return '';
    }).join('')}
        </ul>

        <h3>Work History:</h3>
        <ul>${resume.workExp?.map(job => `<li>${job}</li>`).join('') || 'No work history provided.'}</ul>

        <h3>project:</h3>
        <ul>${resume.project?.map(project => `<li>${project}</li>`).join('') || 'No project provided.'}</ul>

        <h3>Education:</h3>
        <ul>${resume.education?.map(edu => `<li>${edu}</li>`).join('') || 'No education provided.'}</ul>

        <h3>Achievements:</h3>
        <ul>${resume.achievement?.map(ach => `<li>${ach}</li>`).join('') || 'No achievements provided.'}</ul>

        <h3>Other Information:</h3>
        <p>${resume.other || 'No additional information provided.'}</p>

        <h3><u>Declaration:</u></h3>
        <p>${resume.declaration || 'No declaration provided.'}</p>
    `;
};
