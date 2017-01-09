import {setSliderWidth} from './SetSliderWidth';
import {getItemsPerPage} from './GetItemsPerPage';
import {slider} from '../Slider';

function videosLayout(videosArr) {
    const holder = document.querySelector('.holder');
    const navigation = document.querySelector('nav');

    const slideTemplate = document.createElement('section');
    const slideItemTemplate = document.createElement('div');
    const navItemTemplate = document.createElement('a');
    let currentItemsNum = 0;
    let navPointNum = 0;

    slideTemplate.style.width = `${document.body.clientWidth}px`;
    slideTemplate.classList.add('slide');
    slideItemTemplate.classList.add('item');

    let slide = slideTemplate.cloneNode(true);
    let slideItem = slideItemTemplate.cloneNode(true);
    let navItem = navItemTemplate.cloneNode(true);

    setSliderWidth();
    let itemsNum = getItemsPerPage();

    videosArr.forEach(video => {
        insertItemToSlide(video);
    });

    slider();

    function insertItemToSlide(video) {
        slideItem.innerHTML = 
        `<img src="${video.snippet.thumbnails.medium.url}" alt="Video preview">
         <h3><a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">${video.snippet.title}</a></h3>
         <p class="author">${video.snippet.channelTitle}</p>
         <p class="info">
             <span class="time sprite">${video.snippet.publishedAt.substr(0, 10)}</span>
             <span class="views sprite">${video.viewCount}</span>
         </p>
         <p class="description">${video.snippet.description}</p>`;

        slide.appendChild(slideItem);
        slideItem = slideItemTemplate.cloneNode(true);
        currentItemsNum++;

        if (currentItemsNum >= itemsNum) {
            insertSlideToHolder(slide);
            insertPointToNav(navPointNum);
            currentItemsNum = 0;
            navPointNum++;
        }
    }

    function insertSlideToHolder() {
            holder.appendChild(slide);
            slide = slideTemplate.cloneNode(true);
    }

    function insertPointToNav(navPointNum) {
        navItem.setAttribute('href', `#slide-${navPointNum}`);
        navItem.innerText = navPointNum + 1;
        if (navPointNum === 0) {
            navItem.classList.add('active');
        }
        navigation.appendChild(navItem);
        navItem = navItemTemplate.cloneNode(true);
    }
}

export {videosLayout};
