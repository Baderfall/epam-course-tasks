import {youTubeRequest} from './YouTubeRequest';
import {clearLayout} from './Layout/ClearLayout';

const search = function() {
    const input = document.querySelector('#search-input');
    const button = document.querySelector('#search-button');
    button.addEventListener('click', function() {
        clearLayout();
        youTubeRequest(input.value);
    });

    input.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            button.click();
        }
    });
};

export {search};
