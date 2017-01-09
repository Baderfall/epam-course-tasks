function clearLayout() {
    const holder = document.querySelector('.holder'); 
    const navigation = document.querySelector('nav');

    holder.innerHTML = '';
    holder.style.transform = 'translate3d(0,0,0)';
    navigation.innerHTML = '';
}

export {clearLayout};
