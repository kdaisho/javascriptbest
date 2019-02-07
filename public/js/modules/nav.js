function toggleNav(nav, menuButton, backdrop) {
    menuButton.on('click', () => {
        nav.classList.toggle('active');
        backdrop.classList.toggle('active');
    });
}

export default toggleNav;