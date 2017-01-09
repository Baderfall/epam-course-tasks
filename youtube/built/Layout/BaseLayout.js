const body = document.body;
const header = document.createElement('header');
const searchInput = '<input type="text" id="search-input">';
const searchButton = '<button id="search-button">Search</button>';
const slider = '<main class="slider"><div class="holder"></div></main>';
const navigation = document.createElement('nav');

function baseLayout() {
    header.insertAdjacentHTML('beforeend', searchInput);
    header.insertAdjacentHTML('beforeend', searchButton);

    body.appendChild(header);
    body.insertAdjacentHTML('beforeend', slider);
    body.appendChild(navigation);
}

export {baseLayout};
