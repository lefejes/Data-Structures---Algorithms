var Node = function(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  return this;
};

function BinarySearchTree() {
  this.root = null;
}

BinarySearchTree.prototype.add = function(val) {
  var root = this.root;

  if (!root) {
    this.root = new Node(val);
    return;
  }

  var current = root;
  var newNode = new Node(val);

  while (current) {
    if (val < current.value) {
      if (!current.left) {
        current.left = newNode;
        break;
      } else {
        current = current.left;
      }
    } else {
      if (!current.right) {
        current.right = newNode;
      break;
      } else {
      current = current.right;
          }
        }
      }
};

BinarySearchTree.prototype.contains = function(val) {
  var found = false;
  var current = this.root;

  while (!found && current) {
    if (val < current.value) {
      current = current.left;
    } else if (val > current.value) {
      current = current.right;
    } else {
      found = true;
    }
  }
};

BinarySearchTree.prototype.remove = function(val) {
  var found = false;
  var parent = null;
  var current = this.root;
  var childCount;
  var replacement;
  var replacementParent;

  while (!found && current) {
    if (val < current.value) {
      parent = current;
      current = current.left;
    } else if (val > current.value) {
      parent = current;
      current = current.right;
    } else {
      found = true;
    }
  }
  if (found) {
    childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);

    if (current === this.root) {
      switch (childCount) {
        case 0:
          this.root = null;
          break;
        case 1:
          this.root = (current.right === null ? current.left : current.right);
          break;
        case 2:
          replacement = this.root.left;

          while (replacement.right !== null) {
            replacementParent = replacement;
            replacement = replacement.right;
          }

          if (replacementParent !== null) {
            replacementParent.right = replacement.left;
            replacement.right = this.root.right;
            replacement.left = this.root.left;
          } else {
            replacement.right = this.root.right;
          }
          this.root = replacement;
      }
    } else {
      switch (childCount) {
        case 0:
          if (current.value < parent.value) {
            parent.left = null;
          } else {
            parent.right = null;
          }
          break;
        case 1:
          if (current.value < parent.value) {
            parent.left = (current.left === null ? current.right : current.left);
          } else {
            parent.right = (current.left === null ? current.right : current.left);
          }
          break;
        case 2:
          replacement = current.left;
          replacementParent = current;

          while (replacement.right !== null) {
            replacementParent = replacement;
            replacement = replacement.right;
          }

          replacementParent.right = replacement.left;

          replacement.right = current.right;
          replacement.left = current.left;

          if (current.value < parent.value) {
            parent.left = current.left;
          } else {
            parent.right = replacement;
          }
      }
    }
  }
};

BinarySearchTree.prototype.getMinNode = function(val) {
  var current = this.root;
  while (current.left !== null) {
    current = current.left;
  }
  return current.value;
};

BinarySearchTree.prototype.getMaxNode = function(val) {
  var current = this.root;
  while (current.right !== null) {
    current = current.right;
  }
  return current.value;
};

BinarySearchTree.prototype.size = function() {
  var length = 0;

  this.inOrderTraversal(function(node) {
    length++;
  });
  return length;
};

BinarySearchTree.prototype.inOrderTraversal = function(evaluate) {
  function inOrder(node) {
    if (node) {
      if (node.left !== null) {
        inOrder(node.left);
      }
      evaluate.call(this, node);

      if (node.right !== null) {
        inOrder(node.right);
      }
    }
  }
  inOrder(this.root);
};

BinarySearchTree.prototype.preOrderTraversal = function(evaluate) {
  function preOrder(node) {
    evaluate.call(this, node);
    if (node) {
      if (node.left !== null) {
        preOrder(node.left);
      }
      if (node.right !== null) {
        preOrder(node.right);
      }
    }
  }
  preOrder(this.root);
};

BinarySearchTree.prototype.postOrderTraversal = function(evaluate) {
  function postOrder(node) {
    if (node) {
      if (node.left !== null) {
        postOrder(node.left);
      }
      if (node.right !== null) {
        postOrder(node.right);
      }
      evaluate.call(this, node);
    }
  }
  postOrder(this.root);
};

BinarySearchTree.prototype.toArray = function(traversal) {
  var result = [];

  traversal.call(this, function(node) {
    result.push(node.value);
  });
  return result;
};

var bst = new BinarySearchTree();
