function toggleSearch (button, nav, toggleElements, input, searchContainer) {
    let showSearch = false;
    button.on('click', () => {
        nav.classList.toggle('active');
        console.log(toggleElements);
        toggleElements[0].classList.toggle('active');
        searchContainer.classList.toggle('active');
        input.focus();
        showSearch = true;
    });

    toggleElements[1].on('click', () => {
        if (showSearch) {
            nav.classList.remove('active');
        }
        searchContainer.classList.remove('active');
    });
}

export default toggleSearch;