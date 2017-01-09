function getItemsPerPage(argument) {
    let width = document.body.offsetWidth;
    
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

export {getItemsPerPage};
