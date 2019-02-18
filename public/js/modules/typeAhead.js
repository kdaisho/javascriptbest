import axios from 'axios';
import dompurify from 'dompurify';

function searchResultsHTML(courses) {
    return courses.map(course => {
        return `
            <a href="/course/${course.slug}" class="search-result">
                <strong>${course.course}</strong>
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
                    searchResults.innerHTML = dompurify.sanitize(searchResultsHTML(res.data));
                    return false;
                }
                searchResults.innerHTML = dompurify.sanitize(`<div class="search-result">No results for ${this.value}</div>`);
            })
            .catch(err => {
                console.log(error(err));
            });
    });
    searchInput.on('keyup', (event) => {
        if (![38, 40, 13].includes(event.keyCode)) {
            return;
        }
        const activeClass = 'isActive';
        const current = search.querySelector(`.${activeClass}`);
        const items = search.querySelectorAll('.search-result');
        let next;
        if (event.keyCode === 40 && current) {
            next = current.nextElementSibling || items[0];
        }
        else if (event.keyCode === 40) {
            next = items[0];
        }
        else if (event.keyCode === 38 && current) {
            next = current.previousElementSibling || items[items.length - 1];
        }
        else if (event.keyCode === 38) {
            next = items[items.length - 1];
        }
        else if (event.keyCode === 13 && current.href) {
            window.location = current.href;
            return;
        }
        if (current) {
            current.classList.remove(activeClass);
        }
        next.classList.add(activeClass);
    });
}

export default typeAhead;