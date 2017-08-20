import {videosLayout} from './Layout/VideosLayout';

let nextPageToken = '';
let responseJSON;
let statisticsArr;
let itemsIdArr = [];
const xhr = new XMLHttpRequest();
let url;

function youTubeRequest(value) {
    url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyB9COzxg7qOvThJlJcRb523mybrL9MSU84&type=video&part=snippet&maxResults=15&q=${value}&pageToken=${nextPageToken}`;
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onload = () => {
        itemsIdArr = [];
        responseJSON = JSON.parse(xhr.responseText);
        responseJSON.items.forEach(item => {
            itemsIdArr.push(item.id.videoId);
        });
        url = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=${itemsIdArr.join(',')}&part=statistics`;
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = () => {
            statisticsArr = JSON.parse(xhr.responseText).items;
            responseJSON.items.forEach((video, i) => {
                video.viewCount = statisticsArr[i].statistics.viewCount;
            });
            videosLayout(responseJSON.items);
            nextPageToken = responseJSON.nextPageToken;
        };
    };
}

export {youTubeRequest};
