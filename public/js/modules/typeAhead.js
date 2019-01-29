const axios = require('axios');

function searchResultsHTML(reviews) {
    return reviews.map(review => {
        return `
            <a href="/review/${review.slug}" class="search-result">
                <strong>${review.course}</strong>
            </a>
        `;
    }).join('');
}

function typeAhead(search) {
    if (!search) return;

    const searchInput = search.querySelector('input[name="search"]');
    const searchResults = search.querySelector('.search-results');

    searchInput.on('input', function() {
        if (!this.value) {
            searchResults.style.display = 'none';
            return;
        }

        searchResults.style.display = 'block';
        searchResults.innerHTML = '';

        axios
            .get(`/api/search?q=${this.value}`)
            .then(res => {
                if (res.data.length) {
                    searchResults.innerHTML = searchResultsHTML(res.data);
                }
            })
            .catch(err => {
                console.log(error(err));
            });
    });
}

export default typeAhead;