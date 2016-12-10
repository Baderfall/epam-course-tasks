function Node(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this._root = null;
}

BinarySearchTree.prototype.insert = function(key, value) {
    var node = new Node(key, value);
    if (!this._root) {
        this._root = node;
    }
    else {
        insertToChilds(this._root, node);
    }
    return this;

    function insertToChilds(father, node) {
        if (node.key > father.key && father.right === null) {
            father.right = node;
        }
        else if (node.key < father.key && father.left === null) {
            father.left = node;
        }
        else if (node.key > father.key) {
            insertToChilds(father.right, node);
        }
        else if (node.key < father.key) {
            insertToChilds(father.left, node);
        }
    }
};

BinarySearchTree.prototype.delete = function(key) {
    var self = this;
    deleteFromChilds(null, this._root, key);        
    return this;

    function deleteFromChilds(parent, node, key) {
        if (key < node.key) {
            deleteFromChilds(node, node.left, key);
        }
        else if (key > node.key) {
            deleteFromChilds(node, node.right, key);
        }
        else if (key === node.key) {
            if (node.left === null && node.right === null) {
                if (parent === null) {
                    self._root = null;
                }
                else if (parent.left === node) {
                    parent.left = null;
                }
                else {
                    parent.right = null;
                }
            }

            else if (node.left === null && node.right !== null) {
                if (parent === null) {
                    self._root = node.right;
                }
                else {
                    parent.right = node.right;
                }
            }

            else if (node.left !== null && node.right === null) {
                if (parent === null) {
                    self._root = node.left;
                }
                else {
                    parent.left = node.left;
                }
            }

            else if (node.left !== null && node.right !== null) {
                if (node.right.left === null) {
                    if (parent === null) {
                        self._root.right.left = node.left;
                        self._root = node.right;
                    }
                    else {
                        parent.right = node.right;
                        parent.right.left = node.left;
                    }
                }
                else {
                    var minElem = getMinElem(node.right);
                    minElem.parent.left = null;
                    minElem.node.right = node.right;
                    minElem.node.left = node.left;
                    if (parent !== null) {
                        parent.right = minElem.node;    
                    }
                    else {
                        self._root = minElem.node;
                    }
                }
            }
        }

        function getMinElem(node) {
            var minElem = node;
            while (minElem.left) {
                minElem = minElem.left;
            }
            return { node: minElem, parent: node };
        }
    }
};

BinarySearchTree.prototype.search = function(key) {
    if (this._root.key === key) {
        return this._root.value;
    }
    else {
        return searchInChilds(this._root, key);
    }
    function searchInChilds(father, key) {
        if (father.left && father.left.key === key) {
            return father.left.value;
        }
        else if (father.right && father.right.key === key) {
            return father.right.value;
        }
        else if (key < father.key && father.left === null) {
            return undefined;
        }
        else if (key < father.key) {
            return searchInChilds(father.left, key);
        }
        else if (key > father.key && father.right === null) {
            return undefined;
        }
        else if (key > father.key) {
            return searchInChilds(father.right, key);
        }
    }
};

BinarySearchTree.prototype.contains = function(value) {
    if (!this._root) {
        return false;
    }
    else if (this._root.value === value) {
        return true;
    }
    else if (containsInChilds(this._root, value)){
        return true;
    }
    else {
        return false;
    }

    function containsInChilds(father, value) {
        if (father.left && father.left.value === value) {
            return true;
        }
        else if (father.right && father.right.value === value) {
            return true;
        }

        if (father.left) {
            if (containsInChilds(father.left, value)) {
                return true;
            }
        }
        if (father.right) {
            if (containsInChilds(father.right, value)){
                return true;
            }
        }
    }
};

BinarySearchTree.prototype.traverse = function(order) {
    var result = [];
    if (order) {
        traverseChildsLeft(this._root.left, result);
        result.push(this._root.value);
        traverseChildsLeft(this._root.right, result);
    }
    else {
        traverseChildsRight(this._root.right, result);
        result.push(this._root.value);
        traverseChildsRight(this._root.left, result);
    }
    return result;

    function traverseChildsLeft(node, result) {
        if (node.left) {
            traverseChildsLeft(node.left, result);
        }
        result.push(node.value);
        if (node.right) {
            traverseChildsLeft(node.right, result);
        }
    }

    function traverseChildsRight(node, result) {
        if (node.right) {
            traverseChildsRight(node.right, result);
        }
        result.push(node.value);
        if (node.left) {
            traverseChildsRight(node.left, result);
        }
    }
};

BinarySearchTree.prototype.verify = function() {
    if (verifyChilds(this._root) === false) {
        return false;
    }
    else {
        return true;
    }
    function verifyChilds(node) {
        if (node.left && node.left.key > node.key) {
            return false;
        }
        if (node.right && node.right.key < node.key) {
            return false;
        }
        if (node.right) {
            verifyChilds(node.right);
        }
        if (node.left) {
            verifyChilds(node.left);
        }
    }
};

BinarySearchTree.prototype.root = function() {
    if (this._root) {
        return this._root.value;
    }
    else {
        return undefined;
    }
};