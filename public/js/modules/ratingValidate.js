function validateRating (ratingElements, trigger, form, errorMsg) {
    if (!trigger) return;
    trigger.addEventListener('click', () => {
        for (let i = 0; i < ratingElements.length; i++) {
            if (ratingElements[i].checked) {
                errorMsg.classList.remove('active');
                form.submit();
            }
            else {
                errorMsg.classList.add('active');
            }
        }
    });
}

export default validateRating;