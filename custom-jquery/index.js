(function() {

window.$ = $;

function $(value) {
    return new Element(value);
}

function Element(value) {
    this.elements = Array.from(document.querySelectorAll(value));
}

Element.prototype.addClass = function(value) {
    let currentClass;
    let classToInsert;

    if (typeof value === 'string') {
        const valueArr = value.split(' ');
        valueArr.forEach((item) => {
            this.elements.forEach((element) => {
                element.classList.add(item);
            });
        });
    }
    else if (typeof value === 'function') {
        this.elements.forEach((element, index) => {
            currentClass = element.classList[0];
            classToInsert = value(index, currentClass);
            if (classToInsert) {
                classToInsert = classToInsert.split(' ');
                classToInsert.forEach((className) => {
                    element.classList.add(className);
                });
            }
        });
    }
    return this;
};

Element.prototype.append = function(value) {
    if (typeof value === 'string') {
        this.elements.forEach((element) => {
            element.innerHTML = value;
        });
    }
    else if (typeof value === 'object') {
        this.elements.forEach((element) => {
            let newNode = value.cloneNode(true);
            element.appendChild(newNode);
        });
    }
    return this;
};

Element.prototype.html = function(value) {
    if (!value) {
        return this.elements[0].innerHTML;
    }
    else {
        this.elements.forEach((element) => {
            element.innerHTML = value;
        });
    }
    return this;
};

Element.prototype.attr = function(attr, value) {
    if (!value) {
        return this.elements[0].getAttribute(attr);
    }
    else {
        this.elements.forEach((element) => {
            element.setAttribute(attr, value);
        });
    }
    return this;
};

Element.prototype.children = function(selector) {
    let result;

    if (!selector) {
        result = this.elements[0].childNodes;
    }
    else {
        result = this.elements[0].querySelectorAll(selector);
    }
    return result;
};

Element.prototype.css = function(property) {
    if (typeof property === 'string') {
        return this.elements[0].style[property];
    }
    else if (typeof property === 'object') {
        this.elements.forEach((element) => {
            for (let prop in property) {
                element.style[prop] = property[prop];
            }
        });
    }
    return this;
};

Element.prototype.data = function(...args) {
    if (args.length === 0) {
        return this.elements[0].dataset;
    }
    else if (args.length === 1 && typeof args[0] === 'string') {
        return this.elements[0].dataset[args[0]];
    }
    else if (args.length === 2) {
        this.elements.forEach((element) => {
            element.dataset[args[0]] = args[1];
        });
    }
    else if (args.length === 1 && typeof args[0] === 'object') {
        this.elements.forEach((element) => {
            for (let prop in args[0]) {
                element.dataset[prop] = args[0][prop];
            }
        });
    }
    return this;
};

Element.prototype.on = function(...args) {
    let child;
    if (args.length === 2) {
        this.elements[0].addEventListener(args[0], args[1]);
    }
    else if (args.length === 3) {
        child = this.elements[0].querySelector(args[1]);
        child.addEventListener(args[0], args[2]);
    }
    return this;
};

Element.prototype.one = function(event, handler) {
    executeOnes = () => {
        handler();
        this.elements[0].removeEventListener(event, executeOnes);
    };

    this.elements[0].addEventListener(event, executeOnes);
    return this;
};

Element.prototype.each = function(callback) {
    for (let i = 0; i < this.elements.length; i++) {
        if (callback.call(this.elements[i], i, this.elements[i]) === false) {
            break;
        }
    }
};

}());