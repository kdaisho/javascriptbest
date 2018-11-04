function toggleNav(nav, trigger) {
    trigger.on('click', () => {
        nav.classList.toggle('active');
        backdrop.classList.toggle('active');
    });
}

export default toggleNav;