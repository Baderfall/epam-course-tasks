var Node = function(key, value) {
  this.key  = key;
  this.value = value;
  this.left = null;
  this.right = null;
};

var BinarySearchTree = function() {
  this.rot = null;

  this.insert = function(key, value) {
    var node = new Node(key, value);
    if (!this.rot) {
      this.rot = node;
    }
    else {
      this.insertToChilds(this.rot, node);
    }
    return this;
  };

  this.insertToChilds = function(father, node) {
    if (node.key > father.key && father.right === null) {
      father.right = node;
    }
    else if (node.key < father.key && father.left === null) {
      father.left = node;
    }
    else if (node.key > father.key) {
      this.insertToChilds(father.right, node);
    }
    else if (node.key < father.key) {
      this.insertToChilds(father.left, node);
    }
  };

  this.search = function(key) {
    if (this.rot.key == key) {
      return this.rot.value;
    }
    else {
      return this.searchInChilds(this.rot, key);
    }
  };

  this.searchInChilds = function(father, key) {
    if (father.left && father.left.key == key) {
      return father.left.value;
    }
    else if (father.right && father.right.key == key) {
      return father.right.value;
    }
    else if (key < father.key) {
      return this.searchInChilds(father.left, key);
    }
    else if (key > father.key) {
      return this.searchInChilds(father.right, key);
    }
  };

  this.contains = function(value) {
    if (this.rot.value == value) {
      return true;
    }
    else if (this.containsInChilds(this.rot, value)){
      return true;
    }
    else {
      return false;
    }
  };

  this.containsInChilds = function(father, value) {

    if (father.left && father.left.value == value) {
      return true;
    }
    else if (father.right && father.right.value == value) {
      return true;
    }

    if (father.left) {
      if (this.containsInChilds(father.left, value)) {
        return true;
      }
    }
    if (father.right) {
      if (this.containsInChilds(father.right, value)){
        return true;
      }
    }

  };

  this.root = function() {
    return this.rot.value;
  };
};