function validateForms (forms) {
    for (let i = 0; i < forms.length; i++) {
        forms[i].addEventListener('blur', (event) => {
            event.target.classList.add('dirty');
        });
    }
}

export default validateForms;