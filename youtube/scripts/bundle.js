/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _LayoutBaseLayout = __webpack_require__(15);
	
	var _Search = __webpack_require__(6);
	
	(0, _LayoutBaseLayout.baseLayout)();
	(0, _Search.search)();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _LoadMore = __webpack_require__(20);
	
	function slider() {
	    var slider = document.querySelector('.slider');
	    var holder = document.querySelector('.holder');
	    var navigation = document.querySelector('nav');
	    var navigationPoints = Array.from(document.querySelectorAll('nav a'));
	    var slideWidth = slider.offsetWidth;
	
	    var touchStartX = undefined;
	    var touchEndX = undefined;
	    var changedTouchX = undefined;
	    var holderTranslateX = undefined;
	    var swipedLength = undefined;
	    var index = 0;
	
	    function initSlider() {
	        document.ondragstart = function () {
	            return false;
	        };
	
	        document.addEventListener('touchstart', swipeStart);
	        document.addEventListener('mousedown', swipeStart);
	        document.addEventListener('touchend', swipeEnd);
	        document.addEventListener('mouseup', swipeEnd);
	
	        navigation.addEventListener('click', function (event) {
	            if (event.target.localName !== 'a') {
	                return;
	            }
	            event.preventDefault();
	            navigationPoints.forEach(function (point) {
	                point.classList.remove('active');
	            });
	            event.target.classList.add('active');
	            swipeTo(event.target);
	        });
	    }
	
	    function swipeStart(event) {
	        if (event.type === 'touchstart') {
	            touchStartX = event.touches[0].pageX;
	            document.addEventListener('touchmove', swipeMove);
	        } else if (event.type === 'mousedown') {
	            touchStartX = event.clientX;
	            document.addEventListener('mousemove', swipeMove);
	        }
	
	        holder.classList.remove('animate');
	    }
	
	    function swipeMove(event) {
	        if (event.type === 'touchmove') {
	            changedTouchX = event.touches[0].pageX;
	        } else if (event.type === 'mousemove') {
	            changedTouchX = event.clientX;
	        }
	
	        move();
	    }
	
	    function swipeEnd(event) {
	        if (event.type === 'touchend') {
	            touchEndX = event.changedTouches[0].pageX;
	        } else if (event.type === 'mouseup') {
	            touchEndX = event.clientX;
	            document.removeEventListener('mousemove', swipeMove);
	        }
	        end();
	    }
	
	    function move() {
	        holderTranslateX = index * slideWidth + (touchStartX - changedTouchX);
	        if (holderTranslateX < (navigationPoints.length - 1) * slideWidth) {
	            holder.style.transform = 'translate3d(-' + holderTranslateX + 'px,0,0)';
	        }
	    }
	
	    function end() {
	        swipedLength = Math.abs(touchEndX - touchStartX);
	        if (swipedLength > slideWidth / 5) {
	            if (holderTranslateX > index * slideWidth && index < navigationPoints.length - 1) {
	                index++;
	                if (index >= navigationPoints.length - 2) {
	                    (0, _LoadMore.loadMore)();
	                }
	            } else if (holderTranslateX < index * slideWidth && index > 0) {
	                index--;
	            }
	            swipedLength = 0;
	            changeActivePoint();
	        }
	
	        holder.classList.add('animate');
	        holder.style.transform = 'translate3d(-' + index * slideWidth + 'px,0,0)';
	    }
	
	    function changeActivePoint() {
	        navigationPoints.forEach(function (point) {
	            point.classList.remove('active');
	        });
	        navigationPoints[index].classList.add('active');
	    }
	
	    function swipeTo(target) {
	        index = target.attributes.href.value.split('-').pop();
	        holder.classList.add('animate');
	        holder.style.transform = 'translate3d(-' + index * slideWidth + 'px,0,0)';
	    }
	
	    initSlider();
	}
	
	exports.slider = slider;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _YouTubeRequest = __webpack_require__(8);
	
	var _LayoutClearLayout = __webpack_require__(16);
	
	var search = function search() {
	    var input = document.querySelector('#search-input');
	    var button = document.querySelector('#search-button');
	    button.addEventListener('click', function () {
	        (0, _LayoutClearLayout.clearLayout)();
	        (0, _YouTubeRequest.youTubeRequest)(input.value);
	    });
	
	    input.addEventListener('keypress', function (event) {
	        if (event.keyCode === 13) {
	            button.click();
	        }
	    });
	};
	
	exports.search = search;

/***/ },
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _LayoutVideosLayout = __webpack_require__(19);
	
	var nextPageToken = '';
	var responseJSON = undefined;
	var statisticsArr = undefined;
	var itemsIdArr = [];
	var xhr = new XMLHttpRequest();
	var url = undefined;
	
	function youTubeRequest(value) {
	    url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyB9COzxg7qOvThJlJcRb523mybrL9MSU84&type=video&part=snippet&maxResults=15&q=' + value + '&pageToken=' + nextPageToken;
	    xhr.open('GET', url, true);
	    xhr.send();
	
	    xhr.onload = function () {
	        itemsIdArr = [];
	        responseJSON = JSON.parse(xhr.responseText);
	        responseJSON.items.forEach(function (item) {
	            itemsIdArr.push(item.id.videoId);
	        });
	        url = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=' + itemsIdArr.join(',') + '&part=statistics';
	        xhr.open('GET', url, true);
	        xhr.send();
	        xhr.onload = function () {
	            statisticsArr = JSON.parse(xhr.responseText).items;
	            responseJSON.items.forEach(function (video, i) {
	                video.viewCount = statisticsArr[i].statistics.viewCount;
	            });
	            (0, _LayoutVideosLayout.videosLayout)(responseJSON.items);
	            nextPageToken = responseJSON.nextPageToken;
	        };
	    };
	}
	
	exports.youTubeRequest = youTubeRequest;

/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var body = document.body;
	var header = document.createElement('header');
	var searchInput = '<input type="text" id="search-input">';
	var searchButton = '<button id="search-button">Search</button>';
	var slider = '<main class="slider"><div class="holder"></div></main>';
	var navigation = document.createElement('nav');
	
	function baseLayout() {
	    header.insertAdjacentHTML('beforeend', searchInput);
	    header.insertAdjacentHTML('beforeend', searchButton);
	
	    body.appendChild(header);
	    body.insertAdjacentHTML('beforeend', slider);
	    body.appendChild(navigation);
	}
	
	exports.baseLayout = baseLayout;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	function clearLayout() {
	    var holder = document.querySelector('.holder');
	    var navigation = document.querySelector('nav');
	
	    holder.innerHTML = '';
	    holder.style.transform = 'translate3d(0,0,0)';
	    navigation.innerHTML = '';
	}
	
	exports.clearLayout = clearLayout;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	function setSliderWidth() {
	    var slider = document.querySelector('.slider');
	    slider.style.width = document.body.clientWidth;
	}
	exports.setSliderWidth = setSliderWidth;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function getItemsPerPage(argument) {
	    var width = document.body.offsetWidth;
	
	    if (width < 670) {
	        return 1;
	    } else if (width < 1020) {
	        return 2;
	    } else if (width < 1346) {
	        return 3;
	    } else {
	        return 4;
	    }
	}
	
	exports.getItemsPerPage = getItemsPerPage;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _SetSliderWidth = __webpack_require__(17);
	
	var _GetItemsPerPage = __webpack_require__(18);
	
	var _Slider = __webpack_require__(5);
	
	function videosLayout(videosArr) {
	    var holder = document.querySelector('.holder');
	    var navigation = document.querySelector('nav');
	
	    var slideTemplate = document.createElement('section');
	    var slideItemTemplate = document.createElement('div');
	    var navItemTemplate = document.createElement('a');
	    var currentItemsNum = 0;
	    var navPointNum = 0;
	
	    slideTemplate.style.width = document.body.clientWidth + 'px';
	    slideTemplate.classList.add('slide');
	    slideItemTemplate.classList.add('item');
	
	    var slide = slideTemplate.cloneNode(true);
	    var slideItem = slideItemTemplate.cloneNode(true);
	    var navItem = navItemTemplate.cloneNode(true);
	
	    (0, _SetSliderWidth.setSliderWidth)();
	    var itemsNum = (0, _GetItemsPerPage.getItemsPerPage)();
	
	    videosArr.forEach(function (video) {
	        insertItemToSlide(video);
	    });
	
	    (0, _Slider.slider)();
	
	    function insertItemToSlide(video) {
	        slideItem.innerHTML = '<img src="' + video.snippet.thumbnails.medium.url + '" alt="Video preview">\n         <h3><a href="https://www.youtube.com/watch?v=' + video.id.videoId + '" target="_blank">' + video.snippet.title + '</a></h3>\n         <p class="author">' + video.snippet.channelTitle + '</p>\n         <p class="info">\n             <span class="time sprite">' + video.snippet.publishedAt.substr(0, 10) + '</span>\n             <span class="views sprite">' + video.viewCount + '</span>\n         </p>\n         <p class="description">' + video.snippet.description + '</p>';
	
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
	        navItem.setAttribute('href', '#slide-' + navPointNum);
	        navItem.innerText = navPointNum + 1;
	        if (navPointNum === 0) {
	            navItem.classList.add('active');
	        }
	        navigation.appendChild(navItem);
	        navItem = navItemTemplate.cloneNode(true);
	    }
	}
	
	exports.videosLayout = videosLayout;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _YouTubeRequest = __webpack_require__(8);
	
	function loadMore() {
	    // loading...
	}
	
	exports.loadMore = loadMore;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map