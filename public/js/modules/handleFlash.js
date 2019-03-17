function handleFlash (flashMessage) {
    if (!flashMessage) return false;
    setTimeout(() => {
        flashMessage.remove();
    }, 5000);
}

export default handleFlash;