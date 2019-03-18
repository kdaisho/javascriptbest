function showForgotPassword (trigger, hideTarget, showTarget) {
    if (!trigger) return false;

    trigger.addEventListener('click', () => {
        showTarget.style.display = 'block';
        trigger.style.display = 'none';
        if (hideTarget.length) {
            for (let i = 0; i <hideTarget.length; i++) {
                hideTarget[i].style.display = 'none';
            }
        }
    });
}

export default showForgotPassword;