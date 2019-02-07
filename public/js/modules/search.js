function toggleSearch (searchButton, nav, menuButton, backdrop, input, searchContainer, searchResults) {
    let showSearch = false;
    searchButton.on('click', () => {
        nav.classList.toggle('active');
        if (showSearch) {
            backdrop.classList.remove('active');
        }
        backdrop.classList.add('active');
        backdrop.style.zIndex = '70';
        menuButton.classList.toggle('active');
        searchContainer.classList.toggle('active');
        input.focus();
        showSearch = true;
    });
    console.log(searchResults);
    backdrop.on('click', () => {
        if (showSearch) {
            backdrop.classList.remove('active');
            input.value = '';
            searchResults.innerHTML = '';
            searchContainer.classList.remove('active');
            backdrop.style.zIndex = '30';
            showSearch = false;
        }
    });
}

export default toggleSearch;