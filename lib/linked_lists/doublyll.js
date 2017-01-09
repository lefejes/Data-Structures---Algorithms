function Node(data){
  this.data = data;
  this.previous = null;
  this.next = null;
}

function DoublyList() {
  this.length = 0;
  this.head = null;
  this.tail = null;
}

DoublyList.prototype.add = function(val) {
  if (!val) {
    throw new Error("Please pass in a value!");
  }
  var node = new Node(val);

  if (this.length) {
    this.tail.next = node;
    node.previous = this.tail;
    this.tail = node;
  } else {
    this.head = node;
    this.tail = node;
  }
  this.length += 1;

  return node;
};

var dll = new DoublyList();
