import {loadMore} from './LoadMore';

function slider() {
    const slider = document.querySelector('.slider');
    const holder = document.querySelector('.holder');
    const navigation = document.querySelector('nav');
    const navigationPoints = Array.from(document.querySelectorAll('nav a'));
    const slideWidth = slider.offsetWidth;
    
    let touchStartX;
    let touchEndX;
    let changedTouchX;
    let holderTranslateX;
    let swipedLength;
    let index = 0;
    
    function initSlider() {
        document.ondragstart = () => false;
    
        document.addEventListener('touchstart', swipeStart);
        document.addEventListener('mousedown', swipeStart);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mouseup', swipeEnd);
    
        navigation.addEventListener('click', event => {
            if (event.target.localName !== 'a') {
                return;
            }
            event.preventDefault();
            navigationPoints.forEach((point) => {
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
            holder.style.transform = `translate3d(-${holderTranslateX}px,0,0)`;
        }
    }
    
    function end() {
        swipedLength = Math.abs(touchEndX - touchStartX);
        if (swipedLength > slideWidth/5) {
            if (holderTranslateX > index * slideWidth && index < navigationPoints.length - 1) {
                index++;
                if (index >= navigationPoints.length - 2) {
                    loadMore();
                }
            } else if (holderTranslateX < index * slideWidth && index > 0) {
                index--;
            }
            swipedLength = 0;
            changeActivePoint();
        }
    
        holder.classList.add('animate');
        holder.style.transform = `translate3d(-${index * slideWidth}px,0,0)`;
    }
    
    function changeActivePoint() {
        navigationPoints.forEach((point) => {
            point.classList.remove('active');
        });
        navigationPoints[index].classList.add('active');
    }
    
    function swipeTo(target) {
        index = target.attributes.href.value.split('-').pop();
        holder.classList.add('animate');
        holder.style.transform = `translate3d(-${index * slideWidth}px,0,0)`;
    }

    initSlider();
}

export {slider};
