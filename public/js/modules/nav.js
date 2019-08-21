function toggleNav(nav, menuButton, backdrop) {
    menuButton.on('click', () => {
        nav.classList.toggle('active');
        backdrop.classList.toggle('active');
    });
    backdrop.on('click', () => {
        nav.classList.remove('active');
        backdrop.classList.remove('active');
    });
}

export default toggleNav;