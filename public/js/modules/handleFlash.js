function handleFlash (flashMessage) {
    if (!flashMessage) return false;
    setTimeout(() => {
        flashMessage.remove();
    }, 6000);
}

export default handleFlash;